import { IBankLoanConfigurationsRepository } from '$modules/bankLoanConfigurations/repositories/IBankLoanConfigurationsRepository';
import { IProposalsRepository } from '$modules/proposals/repositories';
import { IUserRepository } from '$modules/users/repositories/IUserRepository';
import { Transactional } from '$shared/application/decorators/Transactional.decorator';
import { IServerlessAPI } from '$shared/container/providers/bankerProvider/interfaces/serverless/IServerlessAPI';
import WebSocket from '$subscriptions/socket/WebSocket';
import { Proposal } from '$types';

import { StatusCodes } from '../common/StatusCodes';
import { InvalidProposalStatusError } from '../error/InvalidProposalStatusError';
import { ProposalNotFoundError } from '../error/ProposalNotFoundError';
import { UserNotFoundError } from '../error/UserNotFoundError';
import { GeneratePaymentSlipsAndSaveBookletInputPort } from '../port/in/GeneratePaymentSlipsAndSaveBookletInputPort';
import { GeneratePaymentSlipsAndSaveBookletInput } from './input/GeneratePaymentSlipsAndSaveBookletInput';

export class GeneratePaymentSlipsAndSaveBookletUseCase
  implements GeneratePaymentSlipsAndSaveBookletInputPort
{
  private static readonly SYSTEM_USER = 'system';

  constructor(
    private readonly serverlessApi: IServerlessAPI,
    private readonly bankLoanConfigurationRepository: IBankLoanConfigurationsRepository,
    private readonly proposalsRepository: IProposalsRepository,
    private readonly borrowerRepository: IUserRepository
  ) {}

  @Transactional
  async execute({ proposalId, userId }: GeneratePaymentSlipsAndSaveBookletInput): Promise<void> {
    const proposalData: Proposal = await this.getProposal(proposalId);
    this.verifyProposalStatus(proposalData);
    const generatedBy = await this.obtainGeneratedBy(userId);
    const bankCode = await this.getBankCode(proposalData.bank_loan_configuration_id);
    await this.emitTaskStart(proposalData);
    await this.generatePaymentSlips(proposalData, bankCode, generatedBy);
  }

  async getProposal(proposalId: number | undefined): Promise<Proposal> {
    const proposalData = await this.proposalsRepository.getOne(
      { id: proposalId },
      { includedModels: ['statuses'] }
    );
    if (!proposalData) throw new ProposalNotFoundError();
    return proposalData as unknown as Proposal;
  }

  verifyProposalStatus(proposal: Proposal): void {
    const statusCode = proposal.status?.code;
    if (statusCode !== StatusCodes.PAYMENT_SLIPS_GENERATION_STATUS_CODE) {
      throw new InvalidProposalStatusError();
    }
  }

  async obtainGeneratedBy(id?: number): Promise<string> {
    if (!id) return GeneratePaymentSlipsAndSaveBookletUseCase.SYSTEM_USER;
    const user = await this.borrowerRepository.getOne({ id });
    if (!user) throw new UserNotFoundError();
    return user.email;
  }

  async emitTaskStart(proposal: Proposal): Promise<void> {
    await this.proposalsRepository.updateOne(
      { id: proposal.id, is_back_processing: true },
      { ignoreHistory: true }
    );
    WebSocket.io.to(`proposal.${proposal.id}`).emit('task.start');
  }

  async getBankCode(bankLoanConfigurationId: number): Promise<string> {
    const { bank } = await this.bankLoanConfigurationRepository.getOne(bankLoanConfigurationId, [
      'banks'
    ]);
    return bank.code;
  }

  async generatePaymentSlips(
    proposal: Proposal,
    bankCode: string,
    generatedBy: string
  ): Promise<void> {
    await this.serverlessApi.generatePaymentSlips({ proposal, bankCode, generatedBy });
  }
}

import models from '$models';

import { PaymentSlipRepository } from '$modules/billing/application/port/out/PaymentSlipRepository';
import { PaymentSlip } from '$modules/billing/domain/paymentSlip/PaymentSlip';
import { SequelizeHelper } from '$shared/utils/SequelizeHelper';

export class SequelizePaymentSlipRepository implements PaymentSlipRepository {
  constructor(
    private readonly paymentSlipModel = models.proposal_details,
    private readonly helper = new SequelizeHelper()
  ) {}

  async createMany(paymentSlips: PaymentSlip[]): Promise<void> {
    const models = paymentSlips.map((paymentSlip) => this.toModel(paymentSlip));
    await this.paymentSlipModel.bulkCreate(models);
  }

  async updateMany(paymentSlips: PaymentSlip[]): Promise<void> {
    const updates = paymentSlips
      .filter((paymentSlip) => paymentSlip.getProps().id)
      .map((paymentSlip) => this.toModel(paymentSlip));
    await this.paymentSlipModel.bulkCreate(updates, {
      updateOnDuplicate: ['outdated', 'updated_at']
    });
  }

  async find(proposalId: number, installment?: number): Promise<PaymentSlip[]> {
    const models = await this.paymentSlipModel.findAll({
      where: {
        proposal_id: proposalId,
        ...(installment && { installment })
      },
      order: [['installment', 'ASC']]
    });
    return models.map((model: any) => this.toDomain(model));
  }

  private toModel(paymentSlip: PaymentSlip) {
    return this.helper.toSnakeCase(paymentSlip.getProps());
  }

  private toDomain(model: typeof models.proposal_details) {
    return new PaymentSlip(this.helper.toCamelCase(model.get({ plain: true })));
  }
}

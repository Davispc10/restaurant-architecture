import { Messages } from '$modules/billing/application/common/Messages';
import { GeneratePaymentSlipsAndSaveBookletInputPort } from '$modules/billing/application/port/in/GeneratePaymentSlipsAndSaveBookletInputPort';
import { GeneratePaymentSlipsAndSaveBookletInput } from '$modules/billing/application/usecase/input/GeneratePaymentSlipsAndSaveBookletInput';
import type { IController, IHttpRequest, IHttpResponse } from '$shared/presentation/protocols';
import CustomBillingErrorHandler from '../../middleware/CustomBillingErrorHandler';

export class GeneratePaymentSlipsAndSaveBookletController implements IController {
  constructor(
    private readonly generatePaymentSlipsAndSaveBookletInputPort: GeneratePaymentSlipsAndSaveBookletInputPort
  ) {}

  @CustomBillingErrorHandler()
  async handle({ params, user }: IHttpRequest): Promise<IHttpResponse<void>> {
    const input = GeneratePaymentSlipsAndSaveBookletInput.from({ ...params, userId: user });
    const output = await this.generatePaymentSlipsAndSaveBookletInputPort.execute(input);
    return {
      message: Messages.PAYMENT_SLIPS_GENERATION_SUCCESS_MESSAGE,
      response: output
    };
  }
}

import type { IController, IHttpRequest, IHttpResponse } from '$shared/presentation/protocols';

import { Messages } from '$modules/billing/application/common/Messages';
import { GetPaymentSlipBookletInputPort } from '$modules/billing/application/port/in/GetPaymentSlipBookletInputPort';
import { GetPaymentSlipBookletInput } from '$modules/billing/application/usecase/input/GetPaymentSlipBookletInput';
import CustomBillingErrorHandler from '../../middleware/CustomBillingErrorHandler';
import { GetPaymentSlipBookletResponseDTO } from './dto/response/GetPaymentSlipBookletResponseDTO';

export class GetPaymentSlipBookletController implements IController {
  constructor(private readonly getPaymentSlipBookletInputPort: GetPaymentSlipBookletInputPort) {}

  @CustomBillingErrorHandler()
  async handle({ params }: IHttpRequest): Promise<IHttpResponse<GetPaymentSlipBookletResponseDTO>> {
    const input = GetPaymentSlipBookletInput.from(params);
    const output = await this.getPaymentSlipBookletInputPort.execute(input);
    return {
      message: Messages.GET_PAYMENT_SLIP_BOOKLET_SUCCESS_MESSAGE,
      response: GetPaymentSlipBookletResponseDTO.from(output)
    };
  }
}

import type { IController, IHttpRequest, IHttpResponse } from '$shared/presentation/protocols';

import { Messages } from '$modules/billing/application/common/Messages';
import { GetPaymentSlipsInputPort } from '$modules/billing/application/port/in/GetPaymentSlipsInputPort';
import { GetPaymentSlipsInput } from '$modules/billing/application/usecase/input/GetPaymentSlipsInput';
import CustomBillingErrorHandler from '../../middleware/CustomBillingErrorHandler';
import { GetPaymentSlipsResponseDTO } from './dto/response/GetPaymentSlipsResponseDTO';

export class GetPaymentSlipsController implements IController {
  constructor(private readonly getPaymentSlipsInputPort: GetPaymentSlipsInputPort) {}

  @CustomBillingErrorHandler()
  async handle({
    params,
    query
  }: IHttpRequest): Promise<IHttpResponse<GetPaymentSlipsResponseDTO>> {
    const input = GetPaymentSlipsInput.from({ ...params, ...query });
    const output = await this.getPaymentSlipsInputPort.execute(input);
    return {
      message: Messages.GET_PAYMENT_SLIPS_SUCCESS_MESSAGE,
      response: GetPaymentSlipsResponseDTO.from(output)
    };
  }
}

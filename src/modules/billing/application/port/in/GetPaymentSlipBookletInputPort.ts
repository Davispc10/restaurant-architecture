import { GetPaymentSlipBookletInput } from '../../usecase/input/GetPaymentSlipBookletInput';
import { GetPaymentSlipBookletOutput } from '../../usecase/output/GetPaymentSlipBookletOutput';

export interface GetPaymentSlipBookletInputPort {
  execute(input: GetPaymentSlipBookletInput): Promise<GetPaymentSlipBookletOutput>;
}

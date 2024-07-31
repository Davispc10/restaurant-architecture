import { GetPaymentSlipsInput } from '../../usecase/input/GetPaymentSlipsInput';
import { GetPaymentSlipsOutput } from '../../usecase/output/GetPaymentSlipsOutput';

export interface GetPaymentSlipsInputPort {
  execute(input: GetPaymentSlipsInput): Promise<GetPaymentSlipsOutput>;
}

import { GeneratePaymentSlipsAndSaveBookletInput } from '../../usecase/input/GeneratePaymentSlipsAndSaveBookletInput';

export interface GeneratePaymentSlipsAndSaveBookletInputPort {
  execute(input: GeneratePaymentSlipsAndSaveBookletInput): Promise<void>;
}

import { Messages } from '$modules/billing/application/common/Messages';
import { GeneratePaymentSlipsAndSaveBookletInputPort } from '$modules/billing/application/port/in/GeneratePaymentSlipsAndSaveBookletInputPort';
import { GeneratePaymentSlipsAndSaveBookletInput } from '$modules/billing/application/usecase/input/GeneratePaymentSlipsAndSaveBookletInput';
import { tPrivateProcedure } from '$shared/infra/rpc/trpcProcedures';
import { Request } from 'express';
import { container } from 'tsyringe';
import CustomBillingErrorHandler from '../../middleware/CustomBillingErrorHandler';

export class GeneratePaymentSlipsMethod {
  @CustomBillingErrorHandler()
  public static async generatePaymentSlips(
    req: Request,
    input: GeneratePaymentSlipsAndSaveBookletInput
  ) {
    const inputPort: GeneratePaymentSlipsAndSaveBookletInputPort = container.resolve(
      'GeneratePaymentSlipsAndSaveBookletInputPort'
    );
    await inputPort.execute(input);
    return { message: Messages.PAYMENT_SLIPS_GENERATION_SUCCESS_MESSAGE };
  }
}

export const generatePaymentSlipsProcedure = tPrivateProcedure
  .input(GeneratePaymentSlipsAndSaveBookletInput.schema)
  .query(async ({ input, ctx }) => {
    return await GeneratePaymentSlipsMethod.generatePaymentSlips(ctx.req, input);
  });

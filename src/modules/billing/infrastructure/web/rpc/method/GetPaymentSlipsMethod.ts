import { GetPaymentSlipsInputPort } from '$modules/billing/application/port/in/GetPaymentSlipsInputPort';
import { GetPaymentSlipsInput } from '$modules/billing/application/usecase/input/GetPaymentSlipsInput';
import { tPrivateProcedure } from '$shared/infra/rpc/trpcProcedures';
import { Request } from 'express';
import { container } from 'tsyringe';
import CustomBillingErrorHandler from '../../middleware/CustomBillingErrorHandler';

class GetPaymentSlipsMethod {
  @CustomBillingErrorHandler()
  public static async getPaymentSlips(req: Request, input: GetPaymentSlipsInput) {
    const inputPort = container.resolve<GetPaymentSlipsInputPort>('GetPaymentSlipsInputPort');
    return inputPort.execute(input);
  }
}

export const getPaymentSlipsProcedure = tPrivateProcedure
  .input(GetPaymentSlipsInput.schema)
  .query(async ({ input, ctx }) => {
    return await GetPaymentSlipsMethod.getPaymentSlips(ctx.req, input);
  });

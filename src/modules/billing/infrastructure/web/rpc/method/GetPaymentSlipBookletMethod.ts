import { GetPaymentSlipBookletInputPort } from '$modules/billing/application/port/in/GetPaymentSlipBookletInputPort';
import { GetPaymentSlipBookletInput } from '$modules/billing/application/usecase/input/GetPaymentSlipBookletInput';
import { tPrivateProcedure } from '$shared/infra/rpc/trpcProcedures';
import { Request } from 'express';
import { container } from 'tsyringe';
import CustomBillingErrorHandler from '../../middleware/CustomBillingErrorHandler';

export class GetPaymentSlipBookletMethod {
  @CustomBillingErrorHandler()
  public static async getPaymentSlipBooklet(req: Request, input: GetPaymentSlipBookletInput) {
    const inputPort = container.resolve<GetPaymentSlipBookletInputPort>(
      'GetPaymentSlipBookletInputPort'
    );
    return inputPort.execute(input);
  }
}

export const getPaymentSlipBookletProcedure = tPrivateProcedure
  .input(GetPaymentSlipBookletInput.schema)
  .query(async ({ input, ctx }) => {
    return await GetPaymentSlipBookletMethod.getPaymentSlipBooklet(ctx.req, input);
  });

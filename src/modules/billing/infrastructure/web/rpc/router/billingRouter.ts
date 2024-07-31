import { trpcRouter } from '$shared/infra/rpc/trpcConfig';
import { generatePaymentSlipsProcedure } from '../method/GeneratePaymentSlipsMethod';
import { getPaymentSlipBookletProcedure } from '../method/GetPaymentSlipBookletMethod';
import { getPaymentSlipsProcedure } from '../method/GetPaymentSlipsMethod';

export const billingRouter = trpcRouter({
  generatePaymentSlips: generatePaymentSlipsProcedure,
  getPaymentSlips: getPaymentSlipsProcedure,
  getPaymentSlipBooklet: getPaymentSlipBookletProcedure
});

export default billingRouter;

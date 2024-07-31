import { adaptRoute } from '$shared/adapters/expressRouteAdapter';
import type { Router } from 'express';

const billingRouter = (router: Router): void => {
  router.post(
    '/billing/payment-slip/proposal/:proposalId',
    adaptRoute('GeneratePaymentSlipsAndSaveBookletController')
  );
  router.get(
    '/billing/payment-slip/proposal/:proposalId',
    adaptRoute('GetPaymentSlipsController', true)
  );
  router.get(
    '/billing/payment-slip-booklet/proposal/:proposalId',
    adaptRoute('GetPaymentSlipBookletController', true)
  );
};

module.exports = billingRouter;

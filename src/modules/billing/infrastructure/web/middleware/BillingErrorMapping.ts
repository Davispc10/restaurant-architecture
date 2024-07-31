import { BadGatewayError, FailedDependencyError, NotFoundError, ValidationError } from '$errors';
import { InvalidProposalStatusError } from '$modules/billing/application/error/InvalidProposalStatusError';
import { PaymentSlipBookletNotFoundError } from '$modules/billing/application/error/PaymentSlipBookletNotFoundError';
import { PaymentSlipBookletRetrivalError } from '$modules/billing/application/error/PaymentSlipBookletRetrivalError';
import { PaymentSlipsNotFoundError } from '$modules/billing/application/error/PaymentSlipsNotFoundError';
import { ProposalNotFoundError } from '$modules/billing/application/error/ProposalNotFoundError';
import { UserNotFoundError } from '$modules/billing/application/error/UserNotFoundError';
import { TrpcErrors } from '$shared/infra/common/trpcErrors';
import { TRPCError } from '@trpc/server';
import { ExternalModuleAccessError } from '../../error/ExternalModuleAccessError';
type BillingErrorMapping = {
  [key: string]: new (message: string) => Error;
};

type BillingErrorMappingTrpc = {
  [key: string]: { code: any; message: string };
};

const billingErrorMapping: BillingErrorMapping = {
  [PaymentSlipsNotFoundError.name]: NotFoundError,
  [InvalidProposalStatusError.name]: ValidationError,
  [ProposalNotFoundError.name]: NotFoundError,
  [PaymentSlipBookletNotFoundError.name]: NotFoundError,
  [PaymentSlipBookletRetrivalError.name]: FailedDependencyError,
  [UserNotFoundError.name]: NotFoundError,
  [ExternalModuleAccessError.name]: BadGatewayError
};

export const billingErrorMappingTrpc: BillingErrorMappingTrpc = {
  [PaymentSlipsNotFoundError.name]: {
    code: TrpcErrors.NOT_FOUND,
    message: PaymentSlipsNotFoundError.message
  },
  [InvalidProposalStatusError.name]: {
    code: TrpcErrors.UNPROCESSABLE_CONTENT,
    message: InvalidProposalStatusError.message
  },
  [ProposalNotFoundError.name]: {
    code: TrpcErrors.NOT_FOUND,
    message: ProposalNotFoundError.message
  },
  [PaymentSlipBookletNotFoundError.name]: {
    code: TrpcErrors.NOT_FOUND,
    message: PaymentSlipBookletNotFoundError.message
  },
  [PaymentSlipBookletRetrivalError.name]: {
    code: TrpcErrors.INTERNAL_SERVER_ERROR,
    message: PaymentSlipBookletNotFoundError.message
  },
  [UserNotFoundError.name]: {
    code: TrpcErrors.NOT_FOUND,
    message: UserNotFoundError.message
  },
  [ExternalModuleAccessError.name]: {
    code: TrpcErrors.INTERNAL_SERVER_ERROR,
    message: ExternalModuleAccessError.message
  }
};

export function mapError(error: Error): Error {
  const MappedError = billingErrorMapping[error.constructor.name];
  if (MappedError) return new MappedError(error.message);
  return error;
}

export function mappedTrpcError(error: Error): Error {
  const mappedTrpcError = billingErrorMappingTrpc[error.constructor.name];
  if (mappedTrpcError)
    return new TRPCError({ code: mappedTrpcError.code, message: mappedTrpcError.message });
  return error;
}

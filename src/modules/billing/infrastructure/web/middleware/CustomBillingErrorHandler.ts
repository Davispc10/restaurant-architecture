import { ErrorLogger } from '$shared/infra/config/logger/ErrorLogger';
import { TRPCError } from '@trpc/server';
import { container } from 'tsyringe';
import { mapError, mappedTrpcError } from './BillingErrorMapping';

function isTrpcRequest(args: any[]): boolean {
  return args.some((arg) => arg?.baseUrl?.includes('trpc'));
}

function getProposalId(args: any[]): number {
  const proposalArg = args.find((arg) => arg.params?.proposalId || arg?.proposalId);
  return proposalArg?.params?.proposalId || proposalArg?.proposalId || 0;
}

function logError(errorLogger: ErrorLogger, error: Error, args: any[], context: any): void {
  errorLogger.registerNewError({
    error,
    proposal: getProposalId(args),
    throwingClass: context.constructor.name,
    errorDescription: 'Erro mapeado na camada de aplicação.'
  });
}

export default function CustomBillingErrorHandler(): MethodDecorator {
  return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<void> {
      const errorLogger: ErrorLogger = container.resolve('ErrorLogger');
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        logError(errorLogger, error as Error, args, this);
        if (isTrpcRequest(args)) throw mappedTrpcError(error as TRPCError);
        throw mapError(error as Error);
      }
    };

    return descriptor;
  };
}

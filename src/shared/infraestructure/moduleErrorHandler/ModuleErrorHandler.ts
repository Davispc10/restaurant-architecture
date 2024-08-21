import { container } from 'tsyringe';
import type { CommonHttpErrorMapping } from './ErrorMapping';
import { mapError } from './SharedCommonHttpErrorMapping';
import { TypeBoxError } from '@sinclair/typebox';
import { ValidationError } from '../error/ValidationError';

export default function ModuleErrorHandler(): MethodDecorator {
  return (target: Object, key: string | symbol, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]): Promise<void> {
      try {
        return await originalMethod.apply(this, args);
      } catch (error) {
        if (error instanceof TypeBoxError) throw new ValidationError(error, error.stack ?? '');
        console.error(error as Error, args, this);
        handleCommonHttpError(error as Error);
      }
    };
    return descriptor;
  };
}

function handleCommonHttpError(error: Error) {
  const sharedCommonHttpErrorMapping: CommonHttpErrorMapping = container.resolve(
    'SharedCommonHttpErrorMapping'
  );
  if (sharedCommonHttpErrorMapping[error.constructor.name])
    throw mapError(error as Error, sharedCommonHttpErrorMapping);
  throw new Error('Erro interno desconhecido.');
}

import { InternalServerError, NotFoundError, ParseError } from 'elysia';
import type { CommonHttpErrorMapping } from './ErrorMapping';
import { ConflictError } from '../error/ConflictError';
import { AuthorizationError } from '../error/AuthorizationError';
import { BadRequestError } from '../error/BadRequestError';
import { UnauthorizedError } from '../error/UnauthorizedError';

export const sharedCommonHttpErrorMapping = {
  [NotFoundError.name]: NotFoundError,
  [ParseError.name]: ParseError,
  [InternalServerError.name]: InternalServerError,
  [ConflictError.name]: ConflictError,
  [AuthorizationError.name]: AuthorizationError,
  [BadRequestError.name]: BadRequestError,
  [UnauthorizedError.name]: UnauthorizedError,
};

export function mapError(error: Error, commonHttpErrorMapping: CommonHttpErrorMapping): Error {
  const MappedError =
    commonHttpErrorMapping[error.constructor.name] ??
    sharedCommonHttpErrorMapping[error.constructor.name];
  if (MappedError) return new MappedError(error.message);
  return error;
}

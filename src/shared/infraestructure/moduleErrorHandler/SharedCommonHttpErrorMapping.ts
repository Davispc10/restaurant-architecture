import { InternalServerError, NotFoundError, ParseError } from 'elysia';
import type { CommonHttpErrorMapping } from './ErrorMapping';
import { RestaurantExistsError } from '../../../modules/restaurants/application/usecase/error/RestaurantExistsError';
import { ManagedRestaurantError } from '../../../modules/restaurants/application/usecase/error/ManagedRestaurantError';
import { UserNotManagerError } from '../../../modules/restaurants/application/usecase/error/UserNotManagerError';
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
  [RestaurantExistsError.name]: RestaurantExistsError,
  [ManagedRestaurantError.name]: ManagedRestaurantError,
  [UserNotManagerError.name]: UserNotManagerError
};

export function mapError(error: Error, commonHttpErrorMapping: CommonHttpErrorMapping): Error {
  const MappedError =
    commonHttpErrorMapping[error.constructor.name] ??
    sharedCommonHttpErrorMapping[error.constructor.name];
  if (MappedError) return new MappedError(error.message);
  return error;
}

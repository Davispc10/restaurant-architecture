export interface CommonHttpErrorMapping {
  [key: string]: new (message: string) => Error;
}

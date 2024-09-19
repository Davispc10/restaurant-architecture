import Elysia from 'elysia';
import { auth } from '@shared/infra/adapter/driver/rest/middlewares/auth';

export const signOut = new Elysia()
  .use(auth)
  .post('/sign-out', async ({ signOut: internalSignOut }) => {
    internalSignOut();
  });

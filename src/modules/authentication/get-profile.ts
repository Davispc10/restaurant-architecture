import { Elysia } from 'elysia';
import { auth } from '../../shared/infra/adapter/driver/rest/middlewares/auth';
import { db } from '../../shared/infra/adapter/driven/persistence/drizzle/connection';
import { UnauthorizedError } from '../../shared/infra/error/UnauthorizedError';

export const getProfile = new Elysia().use(auth).get('/me', async ({ getCurrentUser }) => {
  const { userId } = await getCurrentUser();

  const user = await db.query.users.findFirst({
    where(fields, { eq }) {
      return eq(fields.id, userId);
    },
  });

  if (!user) {
    throw new UnauthorizedError();
  }

  return user;
});

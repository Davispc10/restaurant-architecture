import { Elysia } from 'elysia';
import { auth } from '../../shared/infra/web/rest/middlewares/auth';
import { db } from '../../shared/infra/persistence/drizzle/connection';
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

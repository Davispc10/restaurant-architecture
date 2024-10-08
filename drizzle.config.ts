import type { Config } from 'drizzle-kit';
import { env } from './src/env';

export default {
  schema: './src/shared/infra/persistence/drizzle/schema/index.ts',
  out: './src/shared/infra/persistence/drizzle/sql',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
} satisfies Config;

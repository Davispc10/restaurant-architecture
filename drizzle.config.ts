import type { Config } from 'drizzle-kit'
import { env } from './src/env';

export default {
  schema: './src/db/drizzle/schema/index.ts',
  out: './src/db/drizzle/sql',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  }
} satisfies Config;

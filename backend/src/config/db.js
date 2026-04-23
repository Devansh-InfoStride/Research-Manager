import { neon } from '@neondatabase/serverless';
import { env } from './env.js';

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in the environment variables');
}

export const sql = neon(env.DATABASE_URL);

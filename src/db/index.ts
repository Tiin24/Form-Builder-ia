import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!)

if (!sql) {
    throw new Error("API key is missing. Please set GEMINI_API_KEY in your environment variables.");
}
export const db = drizzle(sql,{schema});
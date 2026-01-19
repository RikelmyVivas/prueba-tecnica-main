import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export type Database = ReturnType<typeof createDb>;

export const createDb = (connectionString: string) => {
  const sql = neon(connectionString);
  return drizzle(sql, { schema });
};

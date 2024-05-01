import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

export interface LibreAuthOptions {
  prefix: string;
  adapter: DrizzlePostgreSQLAdapter;
  secret: string;
}

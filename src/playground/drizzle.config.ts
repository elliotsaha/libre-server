import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "src/playground/schema.ts",
  out: "src/playground/migrations/",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.PLAYGROUND_CONNECTION_STRING!,
  },
});

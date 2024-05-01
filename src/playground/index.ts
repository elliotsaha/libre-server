import Fastify, { FastifyInstance } from "fastify";
import { libreAuth } from "..";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { sessionTable, userTable } from "@/playground/schema";

const pool = new Pool();
const db = drizzle(pool);

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

const PORT = 5000;

declare module "fastify" {
  export interface FastifyInstance {
    signJWT: () => string;
  }
}

const fastify = Fastify({
  logger: true,
});

fastify.register(libreAuth, {
  prefix: "/auth",
  adapter,
  secret: process.env.PLAYGROUND_COOKIE_SECRET,
});

fastify.get("/example", async (request, reply) => {
  return fastify.signJWT();
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT });

    ["SIGINT", "SIGTERM"].forEach((signal) => {
      process.on(signal, async () => {
        await fastify.close();
        process.exit(0);
      });
    });
  } catch (e) {
    fastify.log.error(e);
    process.exit(1);
  }
};

start();

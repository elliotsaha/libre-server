import Fastify from "fastify";
import { libreAuth } from "..";

const PORT = 5000;
const fastify = Fastify({
  logger: true,
});

fastify.register(libreAuth, {
  prefix: "/auth",
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

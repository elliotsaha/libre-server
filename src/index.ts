import fp from "fastify-plugin";

export interface LibreAuthOptions {
  prefix: string;
}

export const libreAuth = fp(async (fastify, opts: LibreAuthOptions) => {
  console.log(opts);
});

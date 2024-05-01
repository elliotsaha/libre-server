import fp from "fastify-plugin";
import { LibreAuthOptions } from "./types/plugin-options";
import cookie from "@fastify/cookie";
import { verifyRequestOrigin } from "lucia";

export const libreAuth = fp(async (fastify, opts: LibreAuthOptions) => {
  // register cookies
  fastify.register(cookie, {
    secret: opts.secret,
    hook: "onRequest",
    parseOptions: {},
  });
});

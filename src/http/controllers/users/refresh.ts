import type { FastifyReply, FastifyRequest } from "fastify";
import { AUTH_CONFIG } from "@/config/constants.ts";
import type { CookieSerializeOptions } from "@fastify/cookie";

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const { role } = request.user;

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
      },
    }
  );

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: AUTH_CONFIG.REFRESH_TOKEN_EXPIRES_IN,
      },
    }
  );

  return reply
    .status(200)
    .setCookie(
      "refreshToken",
      refreshToken,
      AUTH_CONFIG.COOKIE_CONFIG as CookieSerializeOptions
    )
    .send({ token });
}

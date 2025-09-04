import type { FastifyReply, FastifyRequest } from "fastify";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error.ts";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case.ts";
import { AUTH_CONFIG } from "@/config/constants.ts";
import { AuthenticateUserDTO } from "@/http/dtos/index.ts";
import type { CookieSerializeOptions } from "@fastify/cookie";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateUserDTO = new AuthenticateUserDTO();
  const { email, password } = authenticateUserDTO.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: AUTH_CONFIG.REFRESH_TOKEN_EXPIRES_IN,
        },
      }
    );

    return reply
      .status(200)
      .setCookie("refreshToken", refreshToken, AUTH_CONFIG.COOKIE_CONFIG as CookieSerializeOptions)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }
    throw error;
  }
}

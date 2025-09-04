import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { env } from "@/env";
import { AUTH_CONFIG } from "@/config/constants.ts";
import { errorHandler } from "./http/middlewares/error-handler.ts";
import { usersRoutes } from "./http/controllers/users/routes.ts";
import { gymsRoutes } from "./http/controllers/gyms/routes.ts";
import { checkInsRoutes } from "./http/controllers/check-ins/routes.ts";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: AUTH_CONFIG.JWT_EXPIRES_IN,
  },
});

app.register(fastifyCookie);

app.register(usersRoutes);
app.register(gymsRoutes);
app.register(checkInsRoutes);

app.setErrorHandler(errorHandler);

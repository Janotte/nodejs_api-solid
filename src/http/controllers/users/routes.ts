import type { FastifyInstance } from "fastify";
import { register } from "./register.ts";
import { authenticate } from "./authenticate.ts";
import { profile } from "./profile.ts";
import { verifyJWT } from "../../middlewares/verify-jwt.ts";
import { refresh } from "./refresh.ts";

export async function usersRoutes(app: FastifyInstance) {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.patch("/token/refresh", refresh);
  
  // Authenticated
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}

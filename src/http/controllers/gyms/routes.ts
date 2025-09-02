import type { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import { search } from "./search.ts";
import { nearby } from "./nearby.ts";
import { create } from "./create.ts";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  // Authenticated
  app.get("/gyms/nearby", nearby);
  app.get("/gyms/search", search);
  app.post("/gyms", create);
}

import type { FastifyInstance } from "fastify";
import { verifyJWT } from "@/http/middlewares/verify-jwt.ts";
import { create } from "./create.ts";
import { validate } from "./validate.ts";
import { history } from "./history.ts";
import { metrics } from "./metrics.ts";


export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  // Authenticated
  app.post("/gyms/:gymId/check-ins", create);
  app.patch("/check-ins/:checkInId/validate", validate);
  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);
 
}

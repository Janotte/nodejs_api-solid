import type { FastifyRequest, FastifyReply } from "fastify";
import { HTTP_STATUS } from "@/config/constants.ts";

/**
 * Middleware for verifying JWT tokens
 * 
 * This middleware validates JWT tokens from the Authorization header
 * and ensures the user is authenticated before accessing protected routes.
 * 
 * @param request - Fastify request object
 * @param reply - Fastify reply object
 * @returns Promise resolving to void or error response
 * 
 * @example
 * ```typescript
 * // Usage in route definition
 * app.addHook("onRequest", verifyJWT);
 * 
 * // Or in specific route
 * app.get("/protected", { onRequest: verifyJWT }, handler);
 * ```
 */
export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
  } catch {
    return reply.status(HTTP_STATUS.UNAUTHORIZED).send({ message: "Unauthorized" });
  }
}
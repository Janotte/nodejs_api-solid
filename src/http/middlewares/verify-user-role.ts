import type { FastifyRequest, FastifyReply } from "fastify";
import { USER_ROLES, HTTP_STATUS } from "@/config/constants.ts";

export function verifyUserRole(roleToVerify: (typeof USER_ROLES)[keyof typeof USER_ROLES]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;
    if (role !== roleToVerify) {
      return reply.status(HTTP_STATUS.UNAUTHORIZED).send({ message: "Unauthorized" });
    }
  };
}

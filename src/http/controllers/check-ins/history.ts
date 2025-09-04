import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchUserCheckInsHistoryUseCase } from "@/use-cases/factories/make-fetch-user-check-ins-history-use-case.ts";
import { CheckInsHistoryDTO } from "@/http/dtos/index.ts";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInsHistoryDTO = new CheckInsHistoryDTO();
  const { page } = checkInsHistoryDTO.parse(request.query);

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase();
  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page: page || 1,
  });

  return reply.status(200).send({
    checkIns,
  });
}

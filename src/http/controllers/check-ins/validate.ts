import type { FastifyReply, FastifyRequest } from "fastify";
import { makeValidateCheckInUseCase } from "@/use-cases/factories/make-validate-check-in-use-case.ts";
import { CheckInIdDTO } from "@/http/dtos/index.ts";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const checkInIdDTO = new CheckInIdDTO();
  const { checkInId } = checkInIdDTO.parse(request.params);

  const validateCheckInUseCase = makeValidateCheckInUseCase();
  await validateCheckInUseCase.execute({
    checkInId,
  });

  return reply.status(204).send();
}

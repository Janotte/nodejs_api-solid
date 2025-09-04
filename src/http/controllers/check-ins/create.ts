import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCheckInUseCase } from "@/use-cases/factories/make-check-in-use-case.ts";
import { CheckInGymIdDTO, CreateCheckInDTO } from "@/http/dtos/index.ts";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const checkInGymIdDTO = new CheckInGymIdDTO();
  const createCheckInDTO = new CreateCheckInDTO();

  const { gymId } = checkInGymIdDTO.parse(request.params);
  const { latitude, longitude } = createCheckInDTO.parse(request.body);

  const createCheckInUseCase = makeCheckInUseCase();
  await createCheckInUseCase.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send();
}

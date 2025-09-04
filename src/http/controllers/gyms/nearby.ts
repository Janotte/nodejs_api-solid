import type { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchNearbyGymsUseCase } from "@/use-cases/factories/make-fetch-nearby-gyms-use-case.ts";
import { FetchNearbyGymsDTO } from "@/http/dtos/index.ts";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const fetchNearbyGymsDTO = new FetchNearbyGymsDTO();
  const { latitude, longitude } = fetchNearbyGymsDTO.parse(request.query);

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();
  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(200).send({ gyms });
}

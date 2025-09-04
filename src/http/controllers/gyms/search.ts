import type { FastifyReply, FastifyRequest } from "fastify";
import { makeSearchGymsUseCase } from "@/use-cases/factories/make-search-gyms-use-case.ts";
import { SearchGymsDTO } from "@/http/dtos/index.ts";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsDTO = new SearchGymsDTO();
  const { query, page } = searchGymsDTO.parse(request.query);

  const searchGymsUseCase = makeSearchGymsUseCase();
  const { gyms } = await searchGymsUseCase.execute({
    query,
    page: page || 1,
  });

  return reply.status(200).send({ gyms });
}

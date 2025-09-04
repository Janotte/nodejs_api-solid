import type { FastifyReply, FastifyRequest } from "fastify";
import { makeCreateGymUseCase } from "@/use-cases/factories/make-create-gym-use-case.ts";
import { CreateGymDTO } from "@/http/dtos/index.ts";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymDTO = new CreateGymDTO();
  const { title, description, phone, latitude, longitude } =
    createGymDTO.parse(request.body);

  const createGymUseCase = makeCreateGymUseCase();
  await createGymUseCase.execute({
    title,
    description: description || null,
    phone: phone || null,
    latitude,
    longitude,
  });

  return reply.status(201).send();
}

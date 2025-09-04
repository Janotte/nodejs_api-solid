import type { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error.ts";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case.ts";
import { RegisterUserDTO } from "@/http/dtos/index.ts";

/**
 * HTTP controller for user registration
 * 
 * Handles POST /users requests to create new user accounts.
 * Validates request data and delegates business logic to the RegisterUseCase.
 * 
 * @param request - Fastify request object containing user data
 * @param reply - Fastify reply object for sending response
 * @returns Promise resolving to HTTP response
 * 
 * @example
 * ```typescript
 * // POST /users
 * // Body: { "name": "John Doe", "email": "john@example.com", "password": "123456" }
 * // Response: 201 Created
 * ```
 */
export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerUserDTO = new RegisterUserDTO();
  const { name, email, password } = registerUserDTO.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({ name, email, password });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    return reply.status(500).send(); // TODO: Implement a better error handling
  }

  return reply.status(201).send();
}

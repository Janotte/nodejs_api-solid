import type { UsersRepository } from "@/repositories/users-repository.ts";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error.ts";
import type { User } from "@prisma/client";


interface AuthenticateUserUseCaseRequest {
  email: string;
  password: string;
}
interface AuthenticateUserUseCaseResponse {
  user: User;
}

class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

export { AuthenticateUserUseCase };

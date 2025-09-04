import { z } from "zod";
import { BaseDTO, CommonValidations } from "./base.dto.ts";
import { BUSINESS_RULES } from "@/config/constants.ts";

/**
 * DTO for user registration request
 */
export class RegisterUserDTO extends BaseDTO<z.ZodType<RegisterUserRequest>> {
  constructor() {
    const schema = z.object({
      name: CommonValidations.name,
      email: CommonValidations.email,
      password: z.string().min(BUSINESS_RULES.MIN_PASSWORD_LENGTH, "Password must be at least 6 characters"),
    });
    super(schema);
  }
}

/**
 * DTO for user authentication request
 */
export class AuthenticateUserDTO extends BaseDTO<z.ZodType<AuthenticateUserRequest>> {
  constructor() {
    const schema = z.object({
      email: CommonValidations.email,
      password: z.string().min(BUSINESS_RULES.MIN_PASSWORD_LENGTH, "Password must be at least 6 characters"),
    });
    super(schema);
  }
}

/**
 * DTO for user profile update request
 */
export class UpdateUserProfileDTO extends BaseDTO<z.ZodType<UpdateUserProfileRequest>> {
  constructor() {
    const schema = z.object({
      name: CommonValidations.name.optional(),
      email: CommonValidations.email.optional(),
    });
    super(schema);
  }
}

/**
 * DTO for user ID parameter validation
 */
export class UserIdDTO extends BaseDTO<z.ZodType<UserIdRequest>> {
  constructor() {
    const schema = z.object({
      id: CommonValidations.id,
    });
    super(schema);
  }
}

// Type definitions for better type safety
export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthenticateUserRequest {
  email: string;
  password: string;
}

export interface UpdateUserProfileRequest {
  name?: string | undefined;
  email?: string | undefined;
}

export interface UserIdRequest {
  id: string;
}

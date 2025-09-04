/**
 * DTOs (Data Transfer Objects) for API validation and parsing
 * 
 * This module exports all DTOs used throughout the application
 * for consistent data validation and type safety.
 */

// Base DTO and common validations
export { BaseDTO, CommonValidations } from "./base.dto.ts";

// User DTOs
export {
  RegisterUserDTO,
  AuthenticateUserDTO,
  UpdateUserProfileDTO,
  UserIdDTO,
  type RegisterUserRequest,
  type AuthenticateUserRequest,
  type UpdateUserProfileRequest,
  type UserIdRequest,
} from "./users.dto.ts";

// Gym DTOs
export {
  CreateGymDTO,
  SearchGymsDTO,
  FetchNearbyGymsDTO,
  GymIdDTO,
  type CreateGymRequest,
  type SearchGymsRequest,
  type FetchNearbyGymsRequest,
  type GymIdRequest,
} from "./gyms.dto.ts";

// Check-in DTOs
export {
  CreateCheckInDTO,
  CheckInIdDTO,
  CheckInGymIdDTO,
  CheckInsHistoryDTO,
  type CreateCheckInRequest,
  type CheckInIdRequest,
  type CheckInGymIdRequest,
  type CheckInsHistoryRequest,
} from "./check-ins.dto.ts";

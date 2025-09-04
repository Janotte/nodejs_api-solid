import { z } from "zod";
import { BaseDTO, CommonValidations } from "./base.dto.ts";
import { BUSINESS_RULES } from "@/config/constants.ts";

/**
 * DTO for creating a check-in
 */
export class CreateCheckInDTO extends BaseDTO<z.ZodType<CreateCheckInRequest>> {
  constructor() {
    const schema = z.object({
      latitude: CommonValidations.coordinate.latitude,
      longitude: CommonValidations.coordinate.longitude,
    });
    super(schema);
  }
}

/**
 * DTO for check-in ID parameter validation
 */
export class CheckInIdDTO extends BaseDTO<z.ZodType<CheckInIdRequest>> {
  constructor() {
    const schema = z.object({
      checkInId: CommonValidations.id,
    });
    super(schema);
  }
}

/**
 * DTO for gym ID parameter validation in check-in context
 */
export class CheckInGymIdDTO extends BaseDTO<z.ZodType<CheckInGymIdRequest>> {
  constructor() {
    const schema = z.object({
      gymId: CommonValidations.id,
    });
    super(schema);
  }
}

/**
 * DTO for fetching user check-ins history
 */
export class CheckInsHistoryDTO extends BaseDTO<z.ZodType<CheckInsHistoryRequest>> {
  constructor() {
    const schema = z.object({
      page: z.coerce.number().int().min(1, "Page must be at least 1").default(1),
    });
    super(schema);
  }
}

// Type definitions
export interface CreateCheckInRequest {
  latitude: number;
  longitude: number;
}

export interface CheckInIdRequest {
  checkInId: string;
}

export interface CheckInGymIdRequest {
  gymId: string;
}

export interface CheckInsHistoryRequest {
  page?: number;
}

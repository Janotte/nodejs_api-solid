import { z } from "zod";
import { BaseDTO, CommonValidations } from "./base.dto.ts";
import { BUSINESS_RULES  } from "@/config/constants.ts";

/**
 * DTO for creating a new gym
 */
export class CreateGymDTO extends BaseDTO<z.ZodType<CreateGymRequest>> {
  constructor() {
    const schema = z.object({
      title: z.string().min(1, "Title is required").max(100, "Title too long"),
      description: z.string().nullable().optional(),
      phone: z.string().nullable().optional(),
      latitude: CommonValidations.coordinate.latitude,
      longitude: CommonValidations.coordinate.longitude,
    });
    super(schema as z.ZodType<CreateGymRequest>);
  }
}

/**
 * DTO for searching gyms
 */
export class SearchGymsDTO extends BaseDTO<z.ZodType<SearchGymsRequest>> {
  constructor() {
    const schema = z.object({
      query: z.string().min(1, "Search query is required"),
      page: z.coerce.number().int().min(1, "Page must be at least 1").default(1),
    });
    super(schema);
  }
}

/**
 * DTO for fetching nearby gyms
 */
export class FetchNearbyGymsDTO extends BaseDTO<z.ZodType<FetchNearbyGymsRequest>> {
  constructor() {
    const schema = z.object({
      latitude: CommonValidations.coordinate.latitude,
      longitude: CommonValidations.coordinate.longitude,
    });
    super(schema);
  }
}

/**
 * DTO for gym ID parameter validation
 */
export class GymIdDTO extends BaseDTO<z.ZodType<GymIdRequest>> {
  constructor() {
    const schema = z.object({
      gymId: CommonValidations.id,
    });
    super(schema);
  }
}

// Type definitions
export interface CreateGymRequest {
  title: string;
  description?: string | null;
  phone?: string | null;
  latitude: number;
  longitude: number;
}

export interface SearchGymsRequest {
  query: string;
  page?: number;
}

export interface FetchNearbyGymsRequest {
  latitude: number;
  longitude: number;
}

export interface GymIdRequest {
  gymId: string;
}

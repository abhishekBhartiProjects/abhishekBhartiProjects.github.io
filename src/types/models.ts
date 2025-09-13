// src/types/models.ts
export type Role = "seeker" | "provider" | "admin";

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  location?: string;
  role: Role;
}

export interface Provider {
  id: number;
  userId: number;
  serviceType: string;
  description?: string;
  location?: string;
  hourlyRate: number;
  rating: number;
}

export interface ServiceRequest {
  id: number;
  userId: number;
  providerId: number;
  serviceDetails: string;
  requestedAt: string;
  status: "Pending"|"Accepted"|"Completed"|"Cancelled"|string;
  preferredDate?: string;
  preferredTime?: string;
  location?: string;
}

export interface Review {
  id: number;
  userId: number;
  providerId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Availability {
  id: number;
  providerId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

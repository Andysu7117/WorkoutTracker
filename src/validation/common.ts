import { z } from "zod";

export const emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" });

export const passwordSchema = z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(100, { message: "Password is too long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character" });
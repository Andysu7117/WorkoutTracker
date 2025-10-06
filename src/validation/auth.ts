import { z } from "zod";
import { emailSchema, passwordSchema } from "./common";

export const signInSchema = z.object({
    email: emailSchema,
    password: z.string().min(1, { message: "Password is required" })
})

export const signUpSchema = z
    .object({
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    })

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
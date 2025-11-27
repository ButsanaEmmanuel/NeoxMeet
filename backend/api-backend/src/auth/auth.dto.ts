import { z } from 'zod';

const passwordPolicyMessage = 'Password must be at least 8 characters and include upper, lower, and number.';

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email({ message: 'Provide a valid email.' }),
  password: z
    .string()
    .min(8, { message: passwordPolicyMessage })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, { message: passwordPolicyMessage }),
  fullName: z.string().trim().min(1, { message: 'Full name is required.' }),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email({ message: 'Provide a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const refreshSchema = z.object({
  refreshToken: z.string().min(10, { message: 'Refresh token missing.' }),
});

export type RefreshDto = z.infer<typeof refreshSchema>;

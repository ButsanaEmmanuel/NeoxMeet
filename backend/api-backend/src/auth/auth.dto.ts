import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1),
});

export type RegisterDto = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginDto = z.infer<typeof loginSchema>;

export const refreshSchema = z.object({
  refreshToken: z.string().min(10),
});

export type RefreshDto = z.infer<typeof refreshSchema>;

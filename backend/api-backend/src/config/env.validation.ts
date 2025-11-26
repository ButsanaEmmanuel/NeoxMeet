import { z } from 'zod';

export const envValidationSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3001),
  GLOBAL_PREFIX: z.string().optional().default(''),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_ACCESS_TTL: z.string().default('15m'),
  JWT_REFRESH_TTL: z.string().default('7d'),
  LIVEKIT_URL: z.string(),
  LIVEKIT_API_KEY: z.string(),
  LIVEKIT_API_SECRET: z.string(),
  OPENAI_API_KEY: z.string().optional(),
  ELEVENLABS_API_KEY: z.string().optional(),
  AI_MAX_AUDIO_SECONDS: z.coerce.number().default(600),
  AI_MAX_FILE_MB: z.coerce.number().default(25),
});

export type EnvVars = z.infer<typeof envValidationSchema>;

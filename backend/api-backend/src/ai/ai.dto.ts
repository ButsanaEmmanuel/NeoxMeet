import { z } from 'zod';

export const translateSchema = z.object({
  text: z.string().min(1),
  sourceLang: z.string().optional(),
  targetLang: z.string().min(2),
});

export type TranslateDto = z.infer<typeof translateSchema>;

export const recapSchema = z.object({
  meetingSessionId: z.string().uuid(),
});

export type RecapDto = z.infer<typeof recapSchema>;

export const ttsSchema = z.object({
  text: z.string().min(1),
  voiceId: z.string().min(1),
});

export type TtsDto = z.infer<typeof ttsSchema>;

export type UploadedAudio = {
  buffer: Buffer;
  originalname?: string;
  size: number;
};

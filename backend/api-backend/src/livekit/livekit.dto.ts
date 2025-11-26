import { z } from 'zod';

export const livekitTokenSchema = z.object({
  roomCode: z.string().min(3),
  displayName: z.string().min(1),
  role: z.enum(['host', 'participant']),
});

export type LivekitTokenDto = z.infer<typeof livekitTokenSchema>;

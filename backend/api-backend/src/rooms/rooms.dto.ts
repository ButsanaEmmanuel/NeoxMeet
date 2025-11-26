import { z } from 'zod';

export const createRoomSchema = z.object({
  title: z.string().min(3),
});

export type CreateRoomDto = z.infer<typeof createRoomSchema>;

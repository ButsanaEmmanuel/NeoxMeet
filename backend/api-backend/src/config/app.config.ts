import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  port: Number(process.env.PORT) || 3001,
  prefix: process.env.GLOBAL_PREFIX || '',
}));

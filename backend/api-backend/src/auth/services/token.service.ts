import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { EnvVars } from '../../config/env.validation';

export interface TokenPayload {
  sub: number;
  email: string;
  name: string;
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService, private readonly configService: ConfigService<EnvVars>) {}

  async createAccessToken(payload: TokenPayload): Promise<string> {
    const options = this.getTokenOptions('JWT_ACCESS_SECRET', 'JWT_ACCESS_TTL_SECONDS');
    return this.jwtService.signAsync(payload, options);
  }

  async createRefreshToken(payload: TokenPayload): Promise<string> {
    const options = this.getTokenOptions('JWT_REFRESH_SECRET', 'JWT_REFRESH_TTL_SECONDS');
    return this.jwtService.signAsync(payload, options);
  }

  verifyRefreshToken(token: string): Promise<TokenPayload> {
    const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
    if (!secret) {
      throw new Error('JWT refresh secret is not configured');
    }
    return this.jwtService.verifyAsync<TokenPayload>(token, { secret });
  }

  private getTokenOptions(secretKey: keyof EnvVars, ttlKey: keyof EnvVars): JwtSignOptions {
    const secret = this.configService.get<string>(secretKey);
    const ttlSeconds = this.configService.get<number>(ttlKey);
    if (!secret) {
      throw new Error(`${secretKey} is not configured`);
    }
    const expiresIn = ttlSeconds ?? 900;
    return { secret, expiresIn };
  }
}

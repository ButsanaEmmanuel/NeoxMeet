import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import argon2 from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { Tokens } from './tokens.interface';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly config: ConfigService) {}

  async register(dto: RegisterDto): Promise<Tokens> {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const passwordHash = await argon2.hash(dto.password);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        name: dto.name,
      },
    });

    return this.issueTokens(user.id, user.email, user.name);
  }

  async login(dto: LoginDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const valid = await argon2.verify(user.passwordHash, dto.password);
    if (!valid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.issueTokens(user.id, user.email, user.name);
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      });
      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user || (user.hashedRefreshToken && !(await argon2.verify(user.hashedRefreshToken, refreshToken)))) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      return this.issueTokens(user.id, user.email, user.name);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: number) {
    await this.prisma.user.update({ where: { id: userId }, data: { hashedRefreshToken: null } });
    return { success: true };
  }

  private async issueTokens(userId: number, email: string, name: string): Promise<Tokens> {
    const payload = { sub: userId, email, name };
    const accessSecret = this.config.get<string>('JWT_ACCESS_SECRET');
    const refreshSecret = this.config.get<string>('JWT_REFRESH_SECRET');

    if (!accessSecret || !refreshSecret) {
      throw new Error('JWT secrets are not configured');
    }
    const accessOptions: JwtSignOptions = {
      secret: accessSecret,
      expiresIn: (this.config.get<string>('JWT_ACCESS_TTL') ?? '15m') as any,
    };
    const refreshOptions: JwtSignOptions = {
      secret: refreshSecret,
      expiresIn: (this.config.get<string>('JWT_REFRESH_TTL') ?? '7d') as any,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, accessOptions),
      this.jwtService.signAsync(payload, refreshOptions),
    ]);

    const hashedRefreshToken = await argon2.hash(refreshToken);
    await this.prisma.user.update({ where: { id: userId }, data: { hashedRefreshToken } });

    return {
      accessToken,
      refreshToken,
    };
  }
}

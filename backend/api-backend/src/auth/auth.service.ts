import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthResponse } from './models/auth-response.type';
import { PasswordHasherService } from './services/password-hasher.service';
import { TokenPayload, TokenService } from './services/token.service';
import { Tokens } from './tokens.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly passwordHasher: PasswordHasherService,
  ) {}

  async register(dto: RegisterDto): Promise<AuthResponse> {
    const normalizedEmail = this.normalizeEmail(dto.email);
    await this.ensureEmailAvailable(normalizedEmail);
    const passwordHash = await this.passwordHasher.hash(dto.password);
    const user = await this.prisma.user.create({
      data: { email: normalizedEmail, passwordHash, name: dto.fullName.trim() },
    });
    const tokens = await this.issueTokens(user);
    return { ...tokens, user: this.mapUser(user) };
  }

  async login(dto: LoginDto): Promise<AuthResponse> {
    const normalizedEmail = this.normalizeEmail(dto.email);
    const user = await this.prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const validPassword = await this.passwordHasher.verify(user.passwordHash, dto.password);
    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.issueTokens(user);
    return { ...tokens, user: this.mapUser(user) };
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    let payload: TokenPayload;
    try {
      payload = await this.tokenService.verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
    if (!user || !user.hashedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const refreshValid = await this.passwordHasher.verify(user.hashedRefreshToken, refreshToken);
    if (!refreshValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return this.issueTokens(user);
  }

  async logout(userId: number): Promise<{ success: boolean }> {
    await this.prisma.user.update({ where: { id: userId }, data: { hashedRefreshToken: null } });
    return { success: true };
  }

  private async ensureEmailAvailable(email: string): Promise<void> {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already registered');
    }
  }

  private async issueTokens(user: User): Promise<Tokens> {
    const payload: TokenPayload = { sub: user.id, email: user.email, name: user.name };
    const accessToken = await this.tokenService.createAccessToken(payload);
    const refreshToken = await this.tokenService.createRefreshToken(payload);
    await this.persistRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  private async persistRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await this.passwordHasher.hash(refreshToken);
    await this.prisma.user.update({ where: { id: userId }, data: { hashedRefreshToken } });
  }

  private mapUser(user: User): AuthResponse['user'] {
    return { id: user.id, email: user.email, fullName: user.name, createdAt: user.createdAt.toISOString() };
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}

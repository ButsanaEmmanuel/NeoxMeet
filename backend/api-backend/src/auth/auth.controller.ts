import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';
import type { LoginDto, RefreshDto, RegisterDto } from './auth.dto';
import { loginSchema, refreshSchema, registerSchema } from './auth.dto';
import { AuthResponse } from './models/auth-response.type';
import { Tokens } from './tokens.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(new ZodValidationPipe(registerSchema)) body: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body(new ZodValidationPipe(loginSchema)) body: LoginDto): Promise<AuthResponse> {
    return this.authService.login(body);
  }

  @Post('refresh')
  refresh(@Body(new ZodValidationPipe(refreshSchema)) body: RefreshDto): Promise<Tokens> {
    return this.authService.refreshTokens(body.refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@CurrentUser('userId') userId: number): Promise<{ success: boolean }> {
    return this.authService.logout(userId);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('/me')
  me(@CurrentUser() user: { userId: number; email: string; name: string }): { userId: number; email: string; name: string } {
    return user;
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('admin/test')
  adminTest(): { ok: boolean } {
    return { ok: true };
  }
}

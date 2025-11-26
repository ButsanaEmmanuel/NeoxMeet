import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { AccessTokenGuard } from '../common/guards/access-token.guard';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';
import type { LoginDto, RefreshDto, RegisterDto } from './auth.dto';
import { loginSchema, refreshSchema, registerSchema } from './auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body(new ZodValidationPipe(registerSchema)) body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body(new ZodValidationPipe(loginSchema)) body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('refresh')
  refresh(@Body(new ZodValidationPipe(refreshSchema)) body: RefreshDto) {
    return this.authService.refreshTokens(body.refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post('logout')
  logout(@CurrentUser('userId') userId: number) {
    return this.authService.logout(userId);
  }

  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('/me')
  me(@CurrentUser() user: any) {
    return user;
  }
}

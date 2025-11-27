import { ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PasswordHasherService } from './services/password-hasher.service';
import { TokenService } from './services/token.service';
import { PrismaService } from '../prisma/prisma.service';

const createDate = (): Date => new Date('2024-01-01T00:00:00.000Z');

describe('AuthService', () => {
  let prisma: PrismaService;
  let tokenService: TokenService;
  let passwordHasher: PasswordHasherService;
  let service: AuthService;

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
      },
    } as unknown as PrismaService;
    tokenService = {
      createAccessToken: jest.fn(),
      createRefreshToken: jest.fn(),
      verifyRefreshToken: jest.fn(),
    } as unknown as TokenService;
    passwordHasher = {
      hash: jest.fn(),
      verify: jest.fn(),
    } as unknown as PasswordHasherService;
    service = new AuthService(prisma, tokenService, passwordHasher);
  });

  it('registers a user, hashes secrets, and stores refresh token', async () => {
    const dto = { email: 'USER@Example.com ', password: 'StrongPass1', fullName: 'Ada Lovelace' };
    const createdUser = {
      id: 1,
      email: 'user@example.com',
      passwordHash: 'hashed-pass',
      name: 'Ada Lovelace',
      createdAt: createDate(),
      hashedRefreshToken: null,
    };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
    (passwordHasher.hash as jest.Mock).mockResolvedValueOnce('hashed-pass');
    (prisma.user.create as jest.Mock).mockResolvedValue(createdUser);
    (tokenService.createAccessToken as jest.Mock).mockResolvedValue('access');
    (tokenService.createRefreshToken as jest.Mock).mockResolvedValue('refresh');
    (passwordHasher.hash as jest.Mock).mockResolvedValueOnce('hashed-refresh');
    (prisma.user.update as jest.Mock).mockResolvedValue({});
    const result = await service.register(dto);
    expect(result).toEqual({
      accessToken: 'access',
      refreshToken: 'refresh',
      user: {
        id: 1,
        email: 'user@example.com',
        fullName: 'Ada Lovelace',
        createdAt: '2024-01-01T00:00:00.000Z',
      },
    });
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { email: 'user@example.com', passwordHash: 'hashed-pass', name: 'Ada Lovelace' },
    });
    expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: 1 }, data: { hashedRefreshToken: 'hashed-refresh' } });
  });

  it('throws when registering with duplicate email', async () => {
    const dto = { email: 'dup@example.com', password: 'StrongPass1', fullName: 'Duplicated User' };
    (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
    await expect(service.register(dto)).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.user.create).not.toHaveBeenCalled();
  });
});

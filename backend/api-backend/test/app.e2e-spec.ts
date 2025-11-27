import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { ZodValidationPipe } from '../src/common/pipes/zod-validation.pipe';
import { PrismaService } from '../src/prisma/prisma.service';

const ensureEnv = (): void => {
  process.env.DATABASE_URL ||= 'postgresql://neoxmeet:neoxmeetpass@localhost:5432/neoxmeet';
  process.env.REDIS_URL ||= 'redis://localhost:6379';
  process.env.JWT_ACCESS_SECRET ||= 'test-access-secret';
  process.env.JWT_REFRESH_SECRET ||= 'test-refresh-secret';
  process.env.JWT_ACCESS_TTL_SECONDS ||= '900';
  process.env.JWT_REFRESH_TTL_SECONDS ||= '604800';
  process.env.LIVEKIT_URL ||= 'http://localhost';
  process.env.LIVEKIT_API_KEY ||= 'test-key';
  process.env.LIVEKIT_API_SECRET ||= 'test-secret';
};

describe('Auth registration (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    ensureEnv();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ZodValidationPipe());
    prisma = app.get(PrismaService);
    await prisma.user.deleteMany();
    await app.init();
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
  });

  it('registers a user and returns tokens with profile', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'e2e@example.com', password: 'StrongPass1', fullName: 'E2E User' })
      .expect(201);
    expect(response.body.accessToken).toBeDefined();
    expect(response.body.refreshToken).toBeDefined();
    expect(response.body.user).toMatchObject({
      email: 'e2e@example.com',
      fullName: 'E2E User',
    });
  });

  it('returns 409 when email already exists', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dup@example.com', password: 'StrongPass1', fullName: 'Existing User' })
      .expect(201);
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'dup@example.com', password: 'StrongPass1', fullName: 'Existing User' })
      .expect(409);
  });
});

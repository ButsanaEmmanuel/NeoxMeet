import { AxiosError, AxiosInstance } from 'axios';
import { describe, expect, it } from 'vitest';
import { AuthApiClient, AuthApiError, RegisterResponse } from './auth-api.client';

describe('AuthApiClient', () => {
  interface MockResponse<T> {
    data: T;
  }
  const buildClient = (postImpl: AxiosInstance['post']): AuthApiClient => {
    const client = { post: postImpl } as AxiosInstance;
    return new AuthApiClient(client);
  };

  it('returns registration payload when request succeeds', async () => {
    const responseData: RegisterResponse = {
      accessToken: 'access',
      refreshToken: 'refresh',
      user: { id: 1, email: 'user@example.com', fullName: 'User Example', createdAt: '2024-01-01T00:00:00.000Z' },
    };
    const client = buildClient(() => Promise.resolve({ data: responseData } as MockResponse<RegisterResponse>));
    const result = await client.register({ email: 'user@example.com', password: 'StrongPass1', fullName: 'User Example' });
    expect(result).toEqual(responseData);
  });

  it('converts axios errors into AuthApiError with status', async () => {
    const axiosError = new AxiosError('Conflict', undefined, undefined, undefined, {
      status: 409,
      statusText: 'Conflict',
      headers: {},
      config: {},
      data: { message: 'Email already registered' },
    });
    const client = buildClient(() => Promise.reject(axiosError));
    await expect(client.register({ email: 'user@example.com', password: 'StrongPass1', fullName: 'User Example' }))
      .rejects.toMatchObject({ message: 'Email already registered', status: 409 } satisfies Partial<AuthApiError>);
  });
});

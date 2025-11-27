import axios, { AxiosInstance, AxiosResponse } from 'axios';
import api from '../../lib/api';

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
}

export interface RegisterResponse {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
}

export class AuthApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export class AuthApiClient {
  private readonly httpClient: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.httpClient = client;
  }

  async register(request: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response: AxiosResponse<RegisterResponse> = await this.httpClient.post('/auth/register', request);
      return response.data;
    } catch (error) {
      throw this.toAuthError(error);
    }
  }

  private toAuthError(error: unknown): AuthApiError {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = (error.response?.data as { message?: string } | undefined)?.message || 'Registration failed';
      return new AuthApiError(message, status);
    }
    if (error instanceof Error) {
      return new AuthApiError(error.message);
    }
    return new AuthApiError('Registration failed');
  }
}

export const authApiClient = new AuthApiClient(api);

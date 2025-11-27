import { Tokens } from '../tokens.interface';

export interface AuthResponse extends Tokens {
  user: {
    id: number;
    email: string;
    fullName: string;
    createdAt: string;
  };
}

import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class PasswordHasherService {
  hash(value: string): Promise<string> {
    return argon2.hash(value);
  }

  verify(hash: string, value: string): Promise<boolean> {
    return argon2.verify(hash, value);
  }
}

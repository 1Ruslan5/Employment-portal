import { TokenType } from '@app/user/types/token.type';
import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  createJwtToken(id: number, role: string): string {
    return sign({ id, role }, process.env.JWT_PASSWORD, { expiresIn: '1d' });
  }

  async validatePassword(password: string, hashPassword: string): Promise<boolean> {
    return await compare(password, hashPassword);
  }

  decodeAuthJwtToken(token: string): TokenType {
    const decoded = verify(token, process.env.JWT_PASSWORD) as JwtPayload;

    if (typeof decoded === 'object' && decoded !== null) {
      return decoded as TokenType;
    } else {
      throw new Error('Invalid token');
    }
  }
}

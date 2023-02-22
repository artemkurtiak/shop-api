import { Injectable } from '@nestjs/common';

import { decode } from 'jsonwebtoken';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  // sign json web token
  sign(payload: string | object, secret: string, expiresIn: number): string {
    return sign(payload, secret, { expiresIn });
  }

  // verify and get payload of json web token
  verify(token: string, secret: string): string | JwtPayload {
    return verify(token, secret);
  }

  // get payload of json web token
  decode(token: string): string | null | JwtPayload {
    return decode(token);
  }
}

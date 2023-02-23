import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthGuard } from '../guards/auth.guard';

export const Auth = (cookieAuth: 'accessToken' | 'refreshToken' = 'accessToken') => {
  return applyDecorators(
    UseGuards(AuthGuard),
    ApiCookieAuth(cookieAuth),
    ApiUnauthorizedResponse({
      description: 'Access token is malformed or invalid',
    }),
  );
};

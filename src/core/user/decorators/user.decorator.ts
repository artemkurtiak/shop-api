import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { AuthenticationTokenPayload } from '@core/auth/types';

export const User = createParamDecorator(
  (field: keyof AuthenticationTokenPayload, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.user?.[field] ?? request.user;
  },
);

import { UserRoleWithSuperAdminType } from '@core/user/types';

import { UserEntity } from '@core/user/entities/user.entity';

export type AuthenticationMethodReturnType = {
  accessToken: string;
  refreshToken: string;
  user: UserEntity;
};

export type AuthenticationTokenPayload = {
  id: number;
  role: UserRoleWithSuperAdminType;
};

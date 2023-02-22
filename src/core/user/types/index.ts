import { ObjectValuesType } from '@shared/common/types/object-values.type';

import { EmailActivationStatus } from '../constants/email-activation-status.constant';
import { UserRole, UserRoleWithSuperAdmin } from '../constants/user-role.constant';
import { UserStatus } from '../constants/user-status.constant';

export type UserRoleType = ObjectValuesType<typeof UserRole>;
export type UserRoleWithSuperAdminType = ObjectValuesType<typeof UserRoleWithSuperAdmin>;
export type UserStatusType = ObjectValuesType<typeof UserStatus>;

export type EmailActivationStatusType = ObjectValuesType<typeof EmailActivationStatus>;

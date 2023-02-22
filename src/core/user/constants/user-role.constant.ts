export const UserRole = {
  OWNER: 'OWNER',
  MANAGER: 'MANAGER',
  CONSUMER: 'CONSUMER',
} as const;

export const UserRoleWithSuperAdmin = {
  ...UserRole,
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

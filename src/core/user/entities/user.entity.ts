import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Column, Entity } from 'typeorm';

import { BaseEntity } from '@shared/database/entities/base.entity';

import { UserRoleWithSuperAdmin } from '../constants/user-role.constant';
import { UserStatus } from '../constants/user-status.constant';

import { UserRoleWithSuperAdminType, UserStatusType } from '../types';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column('varchar')
  @ApiProperty()
  firstName: string;

  @Column('varchar')
  @ApiProperty()
  lastName: string;

  @Column('varchar', { unique: true })
  @ApiProperty()
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar', { nullable: true })
  @ApiPropertyOptional()
  contactEmail?: string;

  @Column('date')
  @ApiProperty()
  birthDate: string;

  @Column({ type: 'enum', enum: UserRoleWithSuperAdmin, name: 'UserRoleWithSuperAdmin' })
  @ApiProperty({ enum: UserRoleWithSuperAdmin, enumName: 'UserRoleWithSuperAdmin' })
  role: UserRoleWithSuperAdminType;

  @Column({ type: 'enum', enum: UserStatus, name: 'UserStatus', default: UserStatus.PENDING })
  @ApiProperty({ enum: UserStatus, enumName: 'UserStatus' })
  status: UserStatusType;
}

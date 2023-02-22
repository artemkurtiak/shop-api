import { ApiProperty } from '@nestjs/swagger';

import { Column, Entity, Generated, JoinColumn, ManyToOne } from 'typeorm';

import { UserEntity } from './user.entity';
import { BaseEntity } from '@shared/database/entities/base.entity';

import { EmailActivationStatus } from '../constants/email-activation-status.constant';

import { EmailActivationStatusType } from '../types';

@Entity({ name: 'email-activation' })
export class EmailActivationEntity extends BaseEntity {
  @Column('uuid')
  @Generated('uuid')
  @ApiProperty()
  token: string;

  @Column({
    type: 'enum',
    enum: EmailActivationStatus,
    enumName: 'EmailActivationStatus',
    default: EmailActivationStatus.PENDING,
  })
  @ApiProperty({ enum: EmailActivationStatus, enumName: 'EmailActivationStatus' })
  status: EmailActivationStatusType;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  @ApiProperty({ type: () => UserEntity })
  user?: UserEntity;

  @Column('integer')
  @ApiProperty()
  userId: number;
}

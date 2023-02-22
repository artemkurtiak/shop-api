import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { UserRoleType } from '@core/user/types';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

import { UserRole } from '@core/user/constants/user-role.constant';

export class SignUpBodyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword()
  @ApiProperty()
  password: string;

  @IsEmail()
  @IsOptional()
  @ApiPropertyOptional()
  contactEmail?: string;

  @IsDateString({ strict: false })
  @ApiProperty()
  birthDate: string;

  @IsIn(Object.values(UserRole))
  @ApiProperty({ enum: UserRole, enumName: 'UserRole' })
  role: UserRoleType;
}

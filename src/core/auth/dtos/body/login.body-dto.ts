import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsString } from 'class-validator';

export class LoginBodyDto {
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  password: string;
}

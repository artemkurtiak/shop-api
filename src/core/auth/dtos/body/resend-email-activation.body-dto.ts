import { ApiProperty } from '@nestjs/swagger';

import { IsEmail } from 'class-validator';

export class ResendEmailActivationBodyDto {
  @IsEmail()
  @ApiProperty()
  email: string;
}

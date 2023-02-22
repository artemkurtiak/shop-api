import { ApiProperty } from '@nestjs/swagger';

import { IsUUID } from 'class-validator';

export class ActivateEmailBodyDto {
  @IsUUID()
  @ApiProperty()
  token: string;
}

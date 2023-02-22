import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { ActivateEmailBodyDto } from './dtos/body/activate-email.body-dto';

@Controller('/user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/activate-email')
  @ApiOperation({
    summary: 'Activate user email',
  })
  @ApiNotFoundResponse({
    description: 'Email activation with passed parameters not found',
  })
  @ApiCreatedResponse({
    description: 'Sucessful email activation',
  })
  activateEmail(@Body() body: ActivateEmailBodyDto) {
    return this.userService.activateEmail(body);
  }
}

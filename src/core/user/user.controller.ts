import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';

import { UserEntity } from './entities/user.entity';

import { User } from './decorators/user.decorator';
import { Auth } from '@core/auth/decorators/auth.decorator';

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

  @Get('/me')
  @Auth()
  @ApiOperation({
    summary: 'Get me',
  })
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'Succesful user getting',
  })
  getMe(@User('id') userId: number) {
    return this.userService.getMe(userId);
  }
}

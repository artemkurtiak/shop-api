import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { UserEntity } from '@core/user/entities/user.entity';

import { LoginBodyDto } from './dtos/body/login.body-dto';
import { ResendEmailActivationBodyDto } from './dtos/body/resend-email-activation.body-dto';
import { SignUpBodyDto } from './dtos/body/sign-up.body-dto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @ApiOperation({
    summary: 'User sign up',
  })
  @ApiConflictResponse({
    description: 'User with passed parameters already exists',
  })
  @ApiCreatedResponse({
    description: 'Successful sign up, activation email sent to provided email',
  })
  signUp(@Body() body: SignUpBodyDto) {
    return this.authService.signUp(body);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'User login',
  })
  @ApiNotFoundResponse({
    description: 'User with passed parameters not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Provided credentials are not valid',
  })
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'Successful login',
  })
  async login(@Body() body: LoginBodyDto) {
    const { accessToken, refreshToken, user } = await this.authService.login(body);

    return user;
  }

  @Post('resend-email-activation')
  @ApiNotFoundResponse({
    description: 'User with passed parameters not found',
  })
  @ApiConflictResponse({
    description: 'Email activation with passed parameters alredy exists',
  })
  @ApiCreatedResponse({
    description: 'Successul email activation resending',
  })
  resendEmailActivation(@Body() body: ResendEmailActivationBodyDto) {
    return this.authService.resendEmailActivation(body);
  }
}

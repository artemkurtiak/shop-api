import { Body, Controller, Post, Res } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Response } from 'express';

import { AuthService } from './auth.service';

import { UserEntity } from '@core/user/entities/user.entity';

import {
  AccessTokenCookieOptions,
  RefreshTokenCookieOptions,
} from './constants/auth-cookies-options.constant';

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
  async login(@Res({ passthrough: true }) response: Response, @Body() body: LoginBodyDto) {
    const { accessToken, refreshToken, user } = await this.authService.login(body);

    response.cookie('accessToken', accessToken, AccessTokenCookieOptions);
    response.cookie('refreshToken', refreshToken, RefreshTokenCookieOptions);

    return user;
  }

  @Post('resend-email-activation')
  @ApiOperation({
    summary: 'Resend user email activation',
  })
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

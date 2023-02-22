import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { compare } from 'bcrypt';
import { Repository } from 'typeorm';

import { Environment } from '@shared/variables/environment';

import { UserService } from '@core/user/user.service';
import { JwtService } from '@shared/jwt/jwt.service';
import { MailService } from '@shared/mail/mail.service';

import { EmailActivationEntity } from '@core/user/entities/email-activation.entity';
import { UserEntity } from '@core/user/entities/user.entity';

import { LoginBodyDto } from './dtos/body/login.body-dto';
import { ResendEmailActivationBodyDto } from './dtos/body/resend-email-activation.body-dto';
import { SignUpBodyDto } from './dtos/body/sign-up.body-dto';

import { AuthenticationMethodReturnType, AuthenticationTokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EmailActivationEntity)
    private readonly emailActivationRepository: Repository<EmailActivationEntity>,
    private readonly userService: UserService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  // user sign up
  async signUp(body: SignUpBodyDto): Promise<void | never> {
    await this.userService.checkUserNotExists({ email: body.email });

    const userEntity = this.userRepository.create(body);

    await this.userRepository.save(userEntity);

    const emailActivationEntity = this.emailActivationRepository.create({
      userId: userEntity.id,
    });

    await this.emailActivationRepository.save(emailActivationEntity);
    await this.mailService.sendMail(body.email, Environment.EMAIL_ACTIVATION_TEMPLATE_ID, {
      token: emailActivationEntity.token,
    });
  }

  // user login
  async login(body: LoginBodyDto): Promise<AuthenticationMethodReturnType | never> {
    const userEntity = await this.userService.checkUserExists({
      email: body.email,
      status: 'ACTIVE',
    });

    const isPasswordMatched = await compare(body.password, userEntity.password);

    if (!isPasswordMatched) throw new UnauthorizedException('Provided credentials are not valid');

    const tokenPayload: AuthenticationTokenPayload = { id: userEntity.id, role: userEntity.role };

    const accessToken = this.jwtService.sign(
      tokenPayload,
      Environment.ACCESS_JWT_SECRET,
      Environment.ACCESS_JWT_EXPIRES_IN,
    );
    const refreshToken = this.jwtService.sign(
      tokenPayload,
      Environment.REFRESH_JWT_SECRET,
      Environment.REFRESH_JWT_EXPIRES_IN,
    );

    return {
      accessToken,
      refreshToken,
      user: userEntity,
    };
  }

  // resend email activation
  async resendEmailActivation(body: ResendEmailActivationBodyDto): Promise<never | void> {
    const userEntity = await this.userService.checkUserExists({ email: body.email });

    await this.userService.checkEmailActivationNotExists({
      status: 'ACCEPTED',
      userId: userEntity.id,
    });

    const emailActivationEntity = this.emailActivationRepository.create({
      userId: userEntity.id,
    });

    await this.emailActivationRepository.save(emailActivationEntity);
    await this.mailService.sendMail(body.email, Environment.EMAIL_ACTIVATION_TEMPLATE_ID, {
      token: emailActivationEntity.token,
    });
  }
}

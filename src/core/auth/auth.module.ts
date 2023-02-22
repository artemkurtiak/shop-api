import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { UserService } from '@core/user/user.service';

import { EmailActivationEntity } from '@core/user/entities/email-activation.entity';
import { UserEntity } from '@core/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, EmailActivationEntity])],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [],
})
export class AuthModule {}

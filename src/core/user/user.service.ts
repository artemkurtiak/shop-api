import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindOptionsWhere, Repository } from 'typeorm';

import { EmailActivationEntity } from './entities/email-activation.entity';
import { UserEntity } from './entities/user.entity';

import { ActivateEmailBodyDto } from './dtos/body/activate-email.body-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EmailActivationEntity)
    private readonly emailActivationRepository: Repository<EmailActivationEntity>,
  ) {}

  // check user not exists by passed options
  async checkUserNotExists(where: FindOptionsWhere<UserEntity>): Promise<void | never> {
    const user = await this.userRepository.findOneBy(where);

    if (user) {
      throw new ConflictException('User with passed parameters already exists');
    }
  }

  // check user exists by passed options
  async checkUserExists(where: FindOptionsWhere<UserEntity>): Promise<UserEntity | never> {
    const user = await this.userRepository.findOneBy(where);

    if (!user) {
      throw new NotFoundException('User with passed parameters not found');
    }

    return user;
  }

  // check email activation exists by passed options
  async checkEmailActivationExists(
    where: FindOptionsWhere<EmailActivationEntity>,
  ): Promise<EmailActivationEntity | never> {
    const emailActivation = await this.emailActivationRepository.findOneBy(where);

    if (!emailActivation) {
      throw new NotFoundException('Email activation with passed parameters not found');
    }

    return emailActivation;
  }

  // check email activation not exists by passed options
  async checkEmailActivationNotExists(
    where: FindOptionsWhere<EmailActivationEntity>,
  ): Promise<void | never> {
    const emailActivation = await this.emailActivationRepository.findOneBy(where);

    if (emailActivation) {
      throw new ConflictException('Email activation with passed parameters alredy exists');
    }
  }

  // activate user email
  async activateEmail(body: ActivateEmailBodyDto): Promise<void | never> {
    const emailActivation = await this.checkEmailActivationExists({
      token: body.token,
      status: 'PENDING',
    });

    await this.emailActivationRepository.update(emailActivation.id, {
      status: 'ACCEPTED',
    });
  }
}

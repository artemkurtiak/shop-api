import { hash } from 'bcrypt';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

import { Environment } from '@shared/variables/environment';

import { UserEntity } from '../entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
  listenTo() {
    return UserEntity;
  }

  async beforeInsert(event: InsertEvent<UserEntity>) {
    event.entity.password = await hash(event.entity.password, Environment.BCRYPT_SALT);
  }
}

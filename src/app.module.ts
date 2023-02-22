import { Module } from '@nestjs/common';

import { AuthModule } from '@core/auth/auth.module';
import { UserModule } from '@core/user/user.module';
import { DatabaseModule } from '@shared/database/database.module';
import { JwtModule } from '@shared/jwt/jwt.module';
import { MailModule } from '@shared/mail/mail.module';

@Module({
  imports: [DatabaseModule, MailModule, JwtModule, AuthModule, UserModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

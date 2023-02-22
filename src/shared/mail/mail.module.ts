import { Global, Module } from '@nestjs/common';

import { MailjetModule } from 'nest-mailjet';

import { Environment } from '@shared/variables/environment';

import { MailService } from './mail.service';

@Global()
@Module({
  imports: [
    MailjetModule.register({
      apiKey: Environment.MAILJET_API_KEY,
      apiSecret: Environment.MAILJET_SECRET,
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

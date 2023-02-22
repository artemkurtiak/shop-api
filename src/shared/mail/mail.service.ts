import { Injectable } from '@nestjs/common';

import { MailjetSendResponse, MailjetService } from 'nest-mailjet';

import { Environment } from '@shared/variables/environment';

@Injectable()
export class MailService {
  constructor(private readonly mailjetService: MailjetService) {}

  // send mail
  sendMail(
    to: string,
    templateId: number,
    variables: Record<string, unknown> = {},
  ): Promise<MailjetSendResponse> {
    return this.mailjetService.send({
      Messages: [
        {
          To: [{ Email: to }],
          Variables: variables,
          TemplateID: templateId,
          From: {
            Email: Environment.MAILJET_SENDER_MAIL,
            Name: Environment.MAILJET_SENDER_NAME,
          },
        },
      ],
    });
  }
}

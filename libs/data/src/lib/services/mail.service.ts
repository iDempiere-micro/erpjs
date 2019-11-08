import { Injectable } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {
    }

    sendTestEmail() {
        this
            .mailerService
            .sendMail({
                to: 'david@podhola.net', // sender address
                from: 'robot@naseukoly.cz', // list of receivers
                subject: 'Testujeme mailer', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>welcome</b>', // HTML body content
            })
            .then((data) => {  console.log('****** MailService success.', data); })
            .catch((error) => { console.log('****** MailService FAIL.', error); });
    }
}

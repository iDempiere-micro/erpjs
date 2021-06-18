import { MAIL_SENT_FROM } from '../queries/mail';
import type { MailSentFromQuery } from '../../generated/graphql';
import type { ReadableQuery } from '@eolerp/common';
import { query } from '@eolerp/common';

class MailService {
    getSentFrom(): ReadableQuery<MailSentFromQuery> {
        return query<MailSentFromQuery>(MAIL_SENT_FROM);
    }
}

export const mailService: MailService = new MailService();

import { query, ReadableQuery } from '../../absorb/svelte-apollo';
import { MAIL_SENT_FROM } from '../queries/mail';
import type { MailSentFromQuery } from '../../generated/graphql';

class MailService {
    getSentFrom(): ReadableQuery<MailSentFromQuery> {
        return query<MailSentFromQuery>(MAIL_SENT_FROM);
    }
}

export const mailService: MailService = new MailService();

import { query, ReadableQuery } from '../../absorb/svelte-apollo';
import type { MailSentFromQuery } from '../../generated/graphql';
import { MAIL_SENT_FROM } from '../queries/mail';

class MailService {
    getSentFrom(): ReadableQuery<MailSentFromQuery> {
        return query<MailSentFromQuery>(MAIL_SENT_FROM);
    }
}

export const mailService: MailService = new MailService();

import gql from 'graphql-tag';
import { mock as mockAttachments } from './attachments';
import { ATTACHMENT_DETAIL_PARTS_RAW } from '../fragments/attachment';

export const SAVE_ATTACHMENT = gql`
    mutation SaveAttachment($id: String, $displayName: String!) {
        saveAttachment(args: { id: $id, displayName: $displayName }) {
            id
        }
    }
`;

export const mock = {
    data: {
        saveAttachment: {
            id: '999',
        },
    },
};

export const GET_ATTACHMENT_BY_ID = gql`
    query attachmentById($id: String!) {
        attachment(id: $id) {
            ${ATTACHMENT_DETAIL_PARTS_RAW}
        }
    }
`;

export const mock1 = {
    data: {
        attachment: mockAttachments.data.attachments[0],
    },
};

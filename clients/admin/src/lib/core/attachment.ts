import type {
    AttachmentByIdQuery,
    AttachmentDetailPartsFragment,
    AttachmentListPartsFragment,
    AttachmentsQuery,
    SaveAttachmentMutation,
    SaveAttachmentMutationVariables,
} from '../../generated/graphql';
import { BaseEntityService } from './entityStore';
import type { DocumentNode } from '@apollo/client/core';
import { ATTACHMENTS } from '../queries/attachments';
import { GET_ATTACHMENT_BY_ID, SAVE_ATTACHMENT } from '../queries/attachment';

class AttachmentService extends BaseEntityService<
    AttachmentDetailPartsFragment,
    AttachmentListPartsFragment,
    SaveAttachmentMutationVariables,
    AttachmentByIdQuery,
    AttachmentsQuery,
    SaveAttachmentMutation
> {
    protected convertDetail(q: AttachmentByIdQuery): AttachmentDetailPartsFragment {
        return q.attachment;
    }

    protected convertListItem(q: AttachmentsQuery): AttachmentListPartsFragment[] {
        return q.attachments;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_ATTACHMENT_BY_ID;
    }

    getDetailSafeEntity(): AttachmentDetailPartsFragment {
        return {} as any;
    }

    protected getListGql(): DocumentNode {
        return ATTACHMENTS;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_ATTACHMENT;
    }

    async download(baseUrl: string | undefined, token: string | undefined, id: string) {
        if (!baseUrl) throw new Error('baseUrl must be specified');
        const json = await (
            await fetch(baseUrl + '/../file/attachment/' + id, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
        ).json();
        const a = document.createElement('a');
        a.href = `data:application/octet-stream;base64,${json.data}`;
        a.setAttribute('download', id);
        a.click();
    }
}

export const attachmentService: AttachmentService = new AttachmentService();

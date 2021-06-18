import type {
    FactoringProviderByIdQuery,
    FactoringProvidersForInvoiceQuery,
    FactoringProvidersQuery,
    SaveFactoringProviderMutation,
    SaveFactoringProviderMutationVariables,
} from '../../generated/graphql';
import { FACTORING_PROVIDERS } from '../queries/factoringProviders';
import {
    GET_FACTORING_PROVIDER_BY_ID,
    SAVE_FACTORING_PROVIDER,
} from '../queries/factoringProvider';
import type { FactoringProviderDetail, FactoringProviderRow } from '../model/factoringProvider';
import { BaseEntityService } from './entityStore';
import type { DocumentNode } from '@apollo/client/core';
import { FACTORING_PROVIDER_FOR_INVOICE } from '../queries/salesInvoice';
import type { ReadableQuery } from '@eolerp/common';
import { query } from '@eolerp/common';

class FactoringProviderService extends BaseEntityService<
    FactoringProviderDetail,
    FactoringProviderRow,
    SaveFactoringProviderMutationVariables,
    FactoringProviderByIdQuery,
    FactoringProvidersQuery,
    SaveFactoringProviderMutation
> {
    protected convertDetail(q: FactoringProviderByIdQuery): FactoringProviderDetail {
        return q.factoringProvider;
    }

    protected convertListItem(q: FactoringProvidersQuery): FactoringProviderRow[] {
        return q.factoringProviders;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_FACTORING_PROVIDER_BY_ID;
    }

    getDetailSafeEntity(): FactoringProviderDetail {
        return {
            customer: {},
            organization: {},
            factoringProvider: {},
        } as any;
    }

    protected getListGql(): DocumentNode {
        return FACTORING_PROVIDERS;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_FACTORING_PROVIDER;
    }

    forInvoice(
        customerId: number,
        organizationId: number,
    ): ReadableQuery<FactoringProvidersForInvoiceQuery> {
        return query<FactoringProvidersForInvoiceQuery, any>(FACTORING_PROVIDER_FOR_INVOICE, {
            variables: { customerId, organizationId },
        });
    }
}

export const factoringProviderService: FactoringProviderService = new FactoringProviderService();

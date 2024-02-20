import type { DocumentNode } from '@apollo/client/core';
import type { ReadableQuery } from '../../absorb/svelte-apollo';
import { query } from '../../absorb/svelte-apollo';
import type {
    FactoringProviderByIdQuery,
    FactoringProvidersForInvoiceQuery,
    FactoringProvidersQuery,
    SaveFactoringProviderMutation,
    SaveFactoringProviderMutationVariables,
} from '../../generated/graphql';
import type { FactoringProviderDetail, FactoringProviderRow } from '../model/factoringProvider';
import {
    GET_FACTORING_PROVIDER_BY_ID,
    SAVE_FACTORING_PROVIDER,
} from '../queries/factoringProvider';
import { FACTORING_PROVIDERS } from '../queries/factoringProviders';
import { FACTORING_PROVIDER_FOR_INVOICE } from '../queries/salesInvoice';
import { BaseEntityService } from './entityStore';

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

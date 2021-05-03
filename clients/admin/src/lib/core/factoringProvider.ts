import type {
    FactoringProviderByIdQuery,
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
}

export const factoringProviderService: FactoringProviderService = new FactoringProviderService();

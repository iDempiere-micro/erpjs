import type {
    FactoringContractByIdQuery,
    FactoringContractsQuery,
    SaveFactoringContractMutation,
    SaveFactoringContractMutationVariables,
} from '../../generated/graphql';
import type { SelectItem } from '../support/select';
import type { FactoringContractDetail, FactoringContractRow } from '../model/factoringContract';
import { BaseEntityService } from './entityStore';
import type { DocumentNode } from '@apollo/client/core';
import {
    GET_FACTORING_CONTRACT_BY_ID,
    SAVE_FACTORING_CONTRACT,
} from '../queries/factoringContract';
import { FACTORING_CONTRACTS } from '../queries/factoringContracts';
import type { ListItemType } from '../../dsl/types';

class FactoringContractService extends BaseEntityService<
    FactoringContractDetail,
    FactoringContractRow,
    SaveFactoringContractMutationVariables,
    FactoringContractByIdQuery,
    FactoringContractsQuery,
    SaveFactoringContractMutation
> {
    protected convertDetail(q: FactoringContractByIdQuery): FactoringContractDetail {
        return q.factoringContract;
    }

    protected convertListItem(q: FactoringContractsQuery): FactoringContractRow[] {
        return q.factoringContracts;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_FACTORING_CONTRACT_BY_ID;
    }

    getDetailSafeEntity(): FactoringContractDetail {
        return {
            customer: {},
            organization: {},
            factoringProvider: {},
        } as any;
    }

    protected getListGql(): DocumentNode {
        return FACTORING_CONTRACTS;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_FACTORING_CONTRACT;
    }

    mapFactoringContracts = (data: FactoringContractRow[]): ListItemType[] =>
        data
            ? data.map(({ id, customer, organization, factoringProvider }) => ({
                  label: id.toString(),
                  text: `${customer.displayName} -> ${factoringProvider.displayName} -> ${organization.displayName}`,
              }))
            : [];
}

export const factoringContractService: FactoringContractService = new FactoringContractService();

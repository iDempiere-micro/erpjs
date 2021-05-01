import type {
    FactoringContractByIdQuery,
    FactoringContractListPartsFragment,
    FactoringContractsQuery,
} from '../../generated/graphql';

import { store } from '../support/store';
import { FACTORING_CONTRACTS } from '../queries/factoringContracts';
import type { SelectItem } from '../support/select';
import { GET_FACTORING_CONTRACT_BY_ID } from '../queries/factoringContract';
import { query } from '../../absorb/svelte-apollo';

export interface WithFactoringContractListPartsFragment {
    loaded: boolean;
    factoringContracts: FactoringContractListPartsFragment[];
}

export const factoringContractsStore = store<WithFactoringContractListPartsFragment>({
    loaded: false,
    factoringContracts: [],
});
export const ensureFactoringContractsStore = () => {
    if (factoringContractsStore.get().loaded) return;

    const factoringContractsResult = query<FactoringContractsQuery>(FACTORING_CONTRACTS);
    factoringContractsResult.subscribe((value) => {
        if (value?.error) throw new Error(`${value?.error}`);
        if (value?.data) {
            factoringContractsStore.update((x) => ({
                loaded: true,
                // @ts-ignore
                factoringContracts: value.data.factoringContracts,
            }));
        }
    });
};

export const mapFactoringContracts = (data: FactoringContractListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ id, customer, organization, factoringProvider }) => ({
              value: id,
              label: `${customer.displayName} -> ${factoringProvider.displayName} -> ${organization.displayName}`,
          }))
        : [];

export const getFactoringContractBy = (id: number) =>
    query<FactoringContractByIdQuery>(GET_FACTORING_CONTRACT_BY_ID, { variables: { id } });

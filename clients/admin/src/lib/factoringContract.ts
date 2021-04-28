import type {
    FactoringContractByIdQuery,
    FactoringContractListPartsFragment,
    FactoringContractsQuery,
} from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import { FACTORING_CONTRACTS } from './queries/factoringContracts';
import type { SelectItem } from './select';
import { GET_FACTORING_CONTRACT_BY_ID } from './queries/factoringContract';

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

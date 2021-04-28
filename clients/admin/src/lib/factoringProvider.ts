import type {
    FactoringProviderByIdQuery,
    FactoringProviderListPartsFragment,
    FactoringProvidersQuery,
} from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import type { SelectItem } from './select';
import { FACTORING_PROVIDERS } from './queries/factoringProviders';
import { GET_FACTORING_PROVIDER_BY_ID } from './queries/factoringProvider';

export interface WithFactoringProviderListPartsFragment {
    loaded: boolean;
    factoringProviders: FactoringProviderListPartsFragment[];
}

export const factoringProvidersStore = store<WithFactoringProviderListPartsFragment>({
    loaded: false,
    factoringProviders: [],
});
export const ensureFactoringProvidersStore = () => {
    if (factoringProvidersStore.get().loaded) return;

    const factoringProvidersResult = query<FactoringProvidersQuery>(FACTORING_PROVIDERS);
    factoringProvidersResult.subscribe((value) => {
        if (value?.data) {
            factoringProvidersStore.update((x) => ({
                loaded: true,
                // @ts-ignore
                factoringProviders: value.data.factoringProviders,
            }));
        }
    });
};

export const mapFactoringProviders = (data: FactoringProviderListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

export const getFactoringProviderBy = (id: number) =>
    query<FactoringProviderByIdQuery>(GET_FACTORING_PROVIDER_BY_ID, { variables: { id } });

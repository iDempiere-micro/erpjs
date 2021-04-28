import type {
    OrganizationByIdQuery,
    OrganizationListPartsFragment,
    OrganizationsQuery,
} from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import type { SelectItem } from './select';
import { ORGANIZATIONS_SIMPLE } from './queries/organizations';
import { GET_ORGANIZATION_BY_ID } from './queries/organization';

export interface WithOrganizationListPartsFragment {
    loaded: boolean;
    organizations: OrganizationListPartsFragment[];
}

export const organizationsStore = store<WithOrganizationListPartsFragment>({
    loaded: false,
    organizations: [],
});
export const ensureOrganizationsStore = () => {
    if (organizationsStore.get().loaded) return;

    const organizationsResult = query<OrganizationsQuery>(ORGANIZATIONS_SIMPLE);
    organizationsResult.subscribe((value) => {
        if (value?.data) {
            organizationsStore.update((x) => ({
                loaded: true,
                // @ts-ignore
                organizations: value.data.organizations,
            }));
        }
    });
};

export const mapOrganizations = (data: OrganizationListPartsFragment[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

export const getOrganizationBy = (id: number) =>
    query<OrganizationByIdQuery>(GET_ORGANIZATION_BY_ID, { variables: { id } });

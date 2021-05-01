import type {
    OrganizationByIdQuery,
    OrganizationListPartsFragment,
    OrganizationsQuery,
} from '../../generated/graphql';

import { store } from '../support/store';
import type { SelectItem } from '../support/select';
import { ORGANIZATIONS_SIMPLE } from '../queries/organizations';
import { GET_ORGANIZATION_BY_ID } from '../queries/organization';
import { query } from '../../absorb/svelte-apollo';

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
        if (value?.error) throw new Error(`${value?.error}`);
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

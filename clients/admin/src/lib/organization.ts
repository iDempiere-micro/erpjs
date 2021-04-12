import gql from 'graphql-tag';
import type { OrganizationListPartsFragment, OrganizationsQuery } from '../generated/graphql';
import { query } from 'svelte-apollo';
import { store } from './store';
import type { SelectItem } from './select';
import { ORGANIZATION_DETAIL_PARTS } from './fragments';

const ORGANIZATIONS = gql`
    {
        organizations {
            displayName
        }
    }
`;

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

    const organizationsResult = query<OrganizationsQuery>(ORGANIZATIONS);
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
              value: displayName,
              label: displayName,
          }))
        : [];

const GET_ORGANIZATION_BY_ID = gql`
    ${ORGANIZATION_DETAIL_PARTS}
    query organizationById($id: Int!) {
        organization(id: $id) {
            ...OrganizationDetailParts
        }
    }
`;

export const getOrganizationBy = (id: number) =>
    query<OrganizationByIdQuery>(GET_ORGANIZATION_BY_ID, { variables: { id } });

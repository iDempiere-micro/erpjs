import type { DocumentNode } from '@apollo/client/core';
import type {
    OrganizationByIdQuery,
    OrganizationsQuery,
    SaveOrganizationMutation,
    SaveOrganizationMutationVariables
} from '../../generated/graphql';
import type { OrganizationDetail, OrganizationRow } from '../model/organization';
import { GET_ORGANIZATION_BY_ID, SAVE_ORGANIZATION } from '../queries/organization';
import { ORGANIZATIONS } from '../queries/organizations';
import { addressService } from './address';
import { BaseEntityService } from './entityStore';

class OrganizationService extends BaseEntityService<
    OrganizationDetail,
    OrganizationRow,
    SaveOrganizationMutationVariables,
    OrganizationByIdQuery,
    OrganizationsQuery,
    SaveOrganizationMutation
> {
    protected convertDetail(q: OrganizationByIdQuery): OrganizationDetail {
        return q.organization;
    }

    protected convertListItem(q: OrganizationsQuery): OrganizationRow[] {
        return q.organizations;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_ORGANIZATION_BY_ID;
    }

    getDetailSafeEntity(): OrganizationDetail {
        return { legalAddress: addressService.getDetailSafeEntity() } as any;
    }

    protected getListGql(): DocumentNode {
        return ORGANIZATIONS;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_ORGANIZATION;
    }
}

export const organizationService: OrganizationService = new OrganizationService();

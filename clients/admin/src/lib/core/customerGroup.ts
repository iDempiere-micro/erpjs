import type { DocumentNode } from '@apollo/client/core';
import type {
    CustomerGroupByIdQuery,
    CustomerGroupsQuery,
    SaveCustomerGroupMutation,
    SaveCustomerGroupMutationVariables,
} from '../../generated/graphql';
import type { CustomerGroupDetail, CustomerGroupRow } from '../model/customerGroup';
import { GET_CUSTOMER_GROUP_BY_ID, SAVE_CUSTOMER_GROUP } from '../queries/customerGroup';
import { CUSTOMER_GROUPS } from '../queries/customerGroups';
import { BaseEntityService } from './entityStore';

class CustomerGroupService extends BaseEntityService<
    CustomerGroupDetail,
    CustomerGroupRow,
    SaveCustomerGroupMutationVariables,
    CustomerGroupByIdQuery,
    CustomerGroupsQuery,
    SaveCustomerGroupMutation
> {
    protected convertDetail(q: CustomerGroupByIdQuery): CustomerGroupDetail {
        return q.customerGroup;
    }

    protected convertListItem(q: CustomerGroupsQuery): CustomerGroupRow[] {
        return q.customerGroups;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_CUSTOMER_GROUP_BY_ID;
    }

    getDetailSafeEntity(): CustomerGroupDetail {
        return {} as any;
    }

    protected getListGql(): DocumentNode {
        return CUSTOMER_GROUPS;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_CUSTOMER_GROUP;
    }
}

export const customerGroupService: CustomerGroupService = new CustomerGroupService();

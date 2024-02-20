import type { DocumentNode } from '@apollo/client/core';
import type {
    CustomerByIdQuery,
    CustomersQuery,
    SaveCustomerMutation,
    SaveCustomerMutationVariables
} from '../../generated/graphql';
import type { CustomerDetail, CustomerRow } from '../model/customer';
import { GET_CUSTOMER_BY_ID, SAVE_CUSTOMER } from '../queries/customer';
import { CUSTOMERS } from '../queries/customers';
import { throwOnUndefined } from '../support/util';
import { addressService } from './address';
import { customerGroupService } from './customerGroup';
import { BaseEntityService } from './entityStore';

class CustomerService extends BaseEntityService<
    CustomerDetail,
    CustomerRow,
    SaveCustomerMutationVariables,
    CustomerByIdQuery,
    CustomersQuery,
    SaveCustomerMutation
> {
    protected convertDetail(q: CustomerByIdQuery): CustomerDetail {
        return {
            ...q.customer,
            safeAddress: q.customer.address || addressService.getDetailSafeEntity(),
            safeCustomerGroup:
                q.customer.customerGroup || customerGroupService.getDetailSafeEntity(),
        };
    }

    protected convertListItem(q: CustomersQuery): CustomerRow[] {
        return q.customers;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_CUSTOMER_BY_ID;
    }

    getDetailSafeEntity(): CustomerDetail {
        return {
            address: addressService.getDetailSafeEntity(),
            legalAddress: addressService.getDetailSafeEntity(),
            safeAddress: addressService.getDetailSafeEntity(),
            customerGroup: customerGroupService.getDetailSafeEntity(),
            safeCustomerGroup: customerGroupService.getDetailSafeEntity(),
        } as any;
    }

    protected getListGql(): DocumentNode {
        return CUSTOMERS;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_CUSTOMER;
    }

    loadCustomerPhotoContent = async (id: number): Promise<string> => {
        const baseUrl = process.env.API_BASE_URL || throwOnUndefined();
        const result = await fetch(baseUrl.replace('graphql', 'file/customer-photo/' + id), {
            headers: {
                Authorization: 'Bearer ' + (process.env.FAKE_TOKEN || (window as any).token),
            },
        });
        const { data } = await result.json();
        return data;
    };

    upload = async (files: any, customerId: number): Promise<void> => {
        if (!files || files.length === 0) return;
        const formData = new FormData();
        formData.append('file', files[0]);
        const baseUrl = process.env.API_BASE_URL || throwOnUndefined();
        const upload = (
            await fetch(baseUrl.replace('graphql', 'file/upload-customer-photo/' + customerId), {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: 'Bearer ' + (process.env.FAKE_TOKEN || (window as any).token),
                },
            })
        ).json();
    };
}

export const customerService: CustomerService = new CustomerService();

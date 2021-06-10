import type {
    BankByIdQuery,
    BanksQuery,
    SaveBankMutation,
    SaveBankMutationVariables,
} from '../../generated/graphql';
import { BANKS } from '../queries/banks';
import { GET_BANK_BY_ID, SAVE_BANK } from '../queries/bank';
import type { BankDetail, BankRow } from '../model/bank';
import { BaseEntityService } from './entityStore';
import type { DocumentNode } from '@apollo/client/core';

class BankService extends BaseEntityService<
    BankDetail,
    BankRow,
    SaveBankMutationVariables,
    BankByIdQuery,
    BanksQuery,
    SaveBankMutation
> {
    protected convertDetail(q: BankByIdQuery): BankDetail {
        return q.bank;
    }

    protected convertListItem(q: BanksQuery): BankRow[] {
        return q.banks;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_BANK_BY_ID;
    }

    getDetailSafeEntity(): BankDetail {
        return { currency: {} } as any;
    }

    protected getListGql(): DocumentNode {
        return BANKS;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_BANK;
    }
}

export const bankService: BankService = new BankService();

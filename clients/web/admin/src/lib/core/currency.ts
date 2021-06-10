import type {
    CurrenciesQuery,
    CurrencyByIdQuery,
    SaveCurrencyMutation,
    SaveCurrencyMutationVariables,
} from '../../generated/graphql';
import { CURRENCIES } from '../queries/currencies';
import { GET_CURRENCY_BY_ID, SAVE_CURRENCY } from '../queries/currency';
import type { CurrencyDetail, CurrencyRow } from '../model/currency';
import { BaseEntityService } from './entityStore';
import type { DocumentNode } from '@apollo/client/core';

class CurrencyService extends BaseEntityService<
    CurrencyDetail,
    CurrencyRow,
    SaveCurrencyMutationVariables,
    CurrencyByIdQuery,
    CurrenciesQuery,
    SaveCurrencyMutation
> {
    protected convertDetail(q: CurrencyByIdQuery): CurrencyDetail {
        return q.currency;
    }

    protected convertListItem(q: CurrenciesQuery): CurrencyRow[] {
        return q.currencies;
    }

    protected getDetailByIdGql(): DocumentNode {
        return GET_CURRENCY_BY_ID;
    }

    getDetailSafeEntity(): CurrencyDetail {
        return { currency: {} } as any;
    }

    protected getListGql(): DocumentNode {
        return CURRENCIES;
    }

    protected getSaveGql(): DocumentNode {
        return SAVE_CURRENCY;
    }
}

export const currencyService: CurrencyService = new CurrencyService();

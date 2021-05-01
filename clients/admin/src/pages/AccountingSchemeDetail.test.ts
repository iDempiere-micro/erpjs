import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import AccountingSchemeDetail from './AccountingSchemeDetail.svelte';
import { setupLocales } from '../i18n';
import { mock1 } from '../lib/queries/accountingScheme';
import { apollo, setClient } from '../lib/support/apollo';

describe('<AccountingSchemeDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders accounting scheme detail', function (done) {
        const { getByText } = render(AccountingSchemeDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock1.data.accountingScheme.displayName);
            expect(document.body.contains(displayName));
            const currency = getByText(mock1.data.accountingScheme.currency.displayName);
            expect(document.body.contains(currency));
            done();
        }, 200);
    });
});

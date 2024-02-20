import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/accountingSchemes';
import { apollo, setClient } from '../lib/support/apollo';
import AccountingSchemes from './AccountingSchemes.svelte';

describe('<AccountingSchemes>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders customers page', function (done) {
        const { getByText } = render(AccountingSchemes);

        setTimeout(() => {
            const customerName = getByText(mock.data.accountingSchemes[0].displayName);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

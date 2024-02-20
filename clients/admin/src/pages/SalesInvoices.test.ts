import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/salesInvoices';
import { apollo, setClient } from '../lib/support/apollo';
import SalesInvoices from './SalesInvoices.svelte';

describe('<SalesInvoices>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders sales invoices page', function (done) {
        const { getByText } = render(SalesInvoices);

        setTimeout(() => {
            const customerName = getByText(mock.data.salesInvoices[0].documentNo);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

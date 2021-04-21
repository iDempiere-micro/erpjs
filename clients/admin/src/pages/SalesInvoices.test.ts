import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import SalesInvoices from './SalesInvoices.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/salesInvoices';

describe('<SalesInvoices>', function () {
    before(() => {
        setupLocales();
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

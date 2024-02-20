import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import { setupLocales } from '../i18n';
import { mock as customerMock } from '../lib/queries/customer';
import { mock1 } from '../lib/queries/salesInvoice';
import { apollo, setClient } from '../lib/support/apollo';
import SalesInvoiceDetail from './SalesInvoiceDetail.svelte';

describe('<SalesInvoiceDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders sales invoice detail', function (done) {
        const { getAllByText } = render(SalesInvoiceDetail, { params: { id: 1 } });

        setTimeout(() => {
            const texts = [
                mock1.data.salesInvoice.documentNo,
                customerMock.data.customer.displayName,
                mock1.data.salesInvoice.organization.displayName,
            ];
            for (const text of texts) {
                const eles = getAllByText(text);
                eles.forEach((ele) => expect(document.body.contains(ele)));
            }
            done();
        }, 200);
    });
});

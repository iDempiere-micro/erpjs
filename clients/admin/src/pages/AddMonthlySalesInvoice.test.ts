import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import { segments } from './pathAndSegment';
import AddMonthlySalesInvoice from './AddMonthlySalesInvoice.svelte';
import { setupLocales } from '../i18n';
import { apollo, setClient } from '../lib/support/apollo';

describe('<AddMonthlySalesInvoice>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders the required fields', function (done) {
        // const { getByTestId, getByText } = render(App, { url: segments.customers });
        const { getByTestId, getAllByText, debug } = render(AddMonthlySalesInvoice, {
            url: segments.customers,
        });

        setTimeout(() => {
            const required = getAllByText('Required');
            expect(required.length).to.be.eq(6);
            done();
        }, 200);
    });
});

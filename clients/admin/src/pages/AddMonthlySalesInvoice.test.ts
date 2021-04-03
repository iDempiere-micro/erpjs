import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import App from '../App.svelte';
import { segments } from './pathAndSegment';
import AddMonthlySalesInvoice from './AddMonthlySalesInvoice.svelte';
import { addMessages, init, getLocaleFromNavigator } from 'svelte-i18n';
import en from '../locales/en.json';
import { setupLocales } from '../i18n';

describe('<AddMonthlySalesInvoice>', function () {
    before(() => {
        setupLocales();
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

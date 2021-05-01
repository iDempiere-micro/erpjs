import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import Products from './Products.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/products';
import { apollo, setClient } from '../lib/support/apollo';

describe('<Products>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders customers page', function (done) {
        const { getByText } = render(Products);

        setTimeout(() => {
            const customerName = getByText(mock.data.products[0].displayName);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

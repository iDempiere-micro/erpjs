import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import Currencies from './Currencies.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/currencies';

describe('<Currencies>', function () {
    before(() => {
        setupLocales();
    });

    it('renders customers page', function (done) {
        const { getByText } = render(Currencies);

        setTimeout(() => {
            const customerName = getByText(mock.data.currencies[0].displayName);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

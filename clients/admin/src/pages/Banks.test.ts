import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import Banks from './Banks.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/banks';
import { apollo, setClient } from '../lib/support/apollo';

describe('<Banks>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders customers page', function (done) {
        const { getByText } = render(Banks);

        setTimeout(() => {
            const customerName = getByText(mock.data.banks[0].displayName);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

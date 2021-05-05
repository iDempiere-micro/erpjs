import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import Countries from './Countries.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/countries';
import { apollo, setClient } from '../lib/support/apollo';

describe('<Countries>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders customers page', function (done) {
        const { getByText } = render(Countries);

        setTimeout(() => {
            const customerName = getByText(mock.data.countries[0].displayName);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

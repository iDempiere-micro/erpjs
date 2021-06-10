import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import CustomerGroups from './CustomerGroups.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/customerGroups';
import { apollo, setClient } from '../lib/support/apollo';

describe('<CustomerGroups>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders customers page', function (done) {
        const { getByText } = render(CustomerGroups);

        setTimeout(() => {
            const customerName = getByText(mock.data.customerGroups[0].displayName);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

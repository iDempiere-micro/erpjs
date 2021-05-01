import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import CustomerDetail from './CustomerDetail.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/customer';
import { apollo, setClient } from '../lib/support/apollo';

describe('<CustomerDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders customer detail', function (done) {
        const { getByText } = render(CustomerDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock.data.customer.displayName);
            expect(document.body.contains(displayName));
            const line1 = getByText(mock.data.customer.legalAddress.line1);
            expect(document.body.contains(line1));
            done();
        }, 200);
    });
});

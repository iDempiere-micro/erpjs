import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import CustomerGroupDetail from './CustomerGroupDetail.svelte';
import { setupLocales } from '../i18n';
import { mock1 } from '../lib/queries/customerGroup';
import { apollo, setClient } from '../lib/support/apollo';

describe('<CustomerGroupDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders customer group detail', function (done) {
        const { getByText } = render(CustomerGroupDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock1.data.customerGroup.displayName);
            expect(document.body.contains(displayName));
            done();
        }, 200);
    });
});

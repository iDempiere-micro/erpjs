import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import BankDetail from './BankDetail.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/banks';
import { apollo, setClient } from '../lib/support/apollo';

describe('<BankDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders accounting scheme detail', function (done) {
        const { getByText } = render(BankDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock.data.banks[0].displayName);
            expect(document.body.contains(displayName));
            const currency = getByText(mock.data.banks[0].bankIdentifierCode);
            expect(document.body.contains(currency));
            done();
        }, 200);
    });
});

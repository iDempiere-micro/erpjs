import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import CurrencyDetail from './CurrencyDetail.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/currencies';
import { apollo, setClient } from '../lib/support/apollo';

describe('<CurrencyDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders accounting scheme detail', function (done) {
        const { getByText } = render(CurrencyDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock.data.currencies[0].displayName);
            expect(document.body.contains(displayName));
            const currency = getByText(mock.data.currencies[0].isoCode);
            expect(document.body.contains(currency));
            done();
        }, 200);
    });
});

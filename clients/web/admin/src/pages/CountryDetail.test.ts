import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import CountryDetail from './CountryDetail.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/countries';
import { apollo, setClient } from '../lib/support/apollo';

describe('<CountryDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders accounting scheme detail', function (done) {
        const { getByText } = render(CountryDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock.data.countries[0].displayName);
            expect(document.body.contains(displayName));
            const currency = getByText(mock.data.countries[0].isoCode);
            expect(document.body.contains(currency));
            done();
        }, 200);
    });
});

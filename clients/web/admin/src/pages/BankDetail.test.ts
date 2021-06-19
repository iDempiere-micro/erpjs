import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import BankDetail from './BankDetail.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/banks';
import { apollo, setClient } from '@eolerp/common';
import { mocks } from '../lib/support/mocks';

describe('<BankDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
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

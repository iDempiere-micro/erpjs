import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import FactoringContracts from './FactoringContracts.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/factoringContracts';
import { apollo, setClient } from '@eolerp/common';
import { mocks } from '../lib/support/mocks';

describe('<FactoringContracts>', function () {
    before(() => {
        setupLocales();
        setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    });

    it('renders customers page', function (done) {
        const { getByText } = render(FactoringContracts);

        setTimeout(() => {
            const invoicePrintNote = getByText(mock.data.factoringContracts[0].invoicePrintNote);
            expect(document.body.contains(invoicePrintNote));
            done();
        }, 200);
    });
});

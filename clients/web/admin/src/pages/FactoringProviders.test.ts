import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import FactoringProviders from './FactoringProviders.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/factoringProviders';
import { apollo, setClient } from '@eolerp/common';
import { mocks } from '../lib/support/mocks';

describe('<FactoringProviders>', function () {
    before(() => {
        setupLocales();
        setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    });

    it('renders customers page', function (done) {
        const { getByText } = render(FactoringProviders);

        setTimeout(() => {
            const customerName = getByText(mock.data.factoringProviders[0].displayName);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

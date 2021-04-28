import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import FactoringContracts from './FactoringContracts.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/factoringContracts';

describe('<FactoringContracts>', function () {
    before(() => {
        setupLocales();
    });

    it('renders customers page', function (done) {
        const { getByText } = render(FactoringContracts);

        setTimeout(() => {
            const customerName = getByText(mock.data.factoringContracts[0].displayName);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import FactoringProviders from './FactoringProviders.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/factoringProviders';

describe('<FactoringProviders>', function () {
    before(() => {
        setupLocales();
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

import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import Organizations from './Organizations.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/organizations';

describe('<Organizations>', function () {
    before(() => {
        setupLocales();
    });

    it('renders customers page', function (done) {
        const { getByText } = render(Organizations);

        setTimeout(() => {
            const customerName = getByText(mock.data.organizations[0].displayName);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

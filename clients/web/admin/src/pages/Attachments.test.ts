import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import Attachments from './Attachments.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/attachments';
import { apollo, setClient } from '../lib/support/apollo';

describe('<Attachments>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders customers page', function (done) {
        const { getByText } = render(Attachments);

        setTimeout(() => {
            const customerName = getByText(mock.data.attachments[0].displayName);
            expect(document.body.contains(customerName));
            done();
        }, 200);
    });
});

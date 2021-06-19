import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import Attachments from './Attachments.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/attachments';
import { apollo, setClient } from '@eolerp/common';
import { mocks } from '../lib/support/mocks';

describe('<Attachments>', function () {
    before(() => {
        setupLocales();
        setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
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

import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import OrganizationDetail from './OrganizationDetail.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/organizations';
import { apollo, setClient } from '../lib/support/apollo';

describe('<OrganizationDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders accounting scheme detail', function (done) {
        const { getByText } = render(OrganizationDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock.data.organizations[0].displayName);
            expect(document.body.contains(displayName));
            const organization = getByText(mock.data.organizations[0].idNumber);
            expect(document.body.contains(organization));
            done();
        }, 200);
    });
});

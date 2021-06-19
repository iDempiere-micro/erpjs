import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import AddCustomer from './AddCustomer.svelte';
import { setupLocales } from '../i18n';
import { apollo, setClient } from '@eolerp/common';
import { mocks } from '../lib/support/mocks';

describe('<AddCustomer>', function () {
    before(() => {
        setupLocales();
        setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    });

    it('display name is required', function () {
        const { getByText } = render(AddCustomer);
        const displayNameRequired = getByText('The display name is required');
        expect(document.body.contains(displayNameRequired));
    });
});

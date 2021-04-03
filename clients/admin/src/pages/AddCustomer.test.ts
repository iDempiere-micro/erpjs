import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import AddCustomer from './AddCustomer.svelte';
import { setupLocales } from '../i18n';

describe('<AddCustomer>', function () {
    before(() => {
        setupLocales();
    });

    it('display name is required', function () {
        const { getByText } = render(AddCustomer);
        const displayNameRequired = getByText('The display name is required');
        expect(document.body.contains(displayNameRequired));
    });
});

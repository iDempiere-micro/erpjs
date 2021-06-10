import { fireEvent, render } from '@testing-library/svelte';
import { expect } from 'chai';
import AddFactoringProvider from './AddFactoringProvider.svelte';
import { setupLocales } from '../i18n';
import { apollo, setClient } from '../lib/support/apollo';

describe('<AddFactoringProvider>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    const getDisplayNameAndCurrency = () => {
        const { getByTestId } = render(AddFactoringProvider);
        const displayName = getByTestId('displayName');
        const legalName = getByTestId('legalName');
        const saveButton: HTMLButtonElement = getByTestId('saveButton') as HTMLButtonElement;
        return { displayName, legalName, saveButton };
    };

    it('display name and legalName are rendered, form is disabled', function () {
        const { displayName, legalName, saveButton } = getDisplayNameAndCurrency();
        expect(document.body.contains(displayName));
        expect(document.body.contains(legalName));
        expect(document.body.contains(saveButton));
        expect(saveButton.disabled);
    });

    it('after filling the form is enabled and is sent', function () {
        const { displayName, legalName, saveButton } = getDisplayNameAndCurrency();
        fireEvent.change(displayName, { target: { value: '23' } });
        fireEvent.change(legalName, { target: { value: '45' } });
        expect(!saveButton.disabled);
        fireEvent.click(saveButton);
    });
});

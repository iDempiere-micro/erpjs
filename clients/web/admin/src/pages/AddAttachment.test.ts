import { fireEvent, render } from '@testing-library/svelte';
import { expect } from 'chai';
import AddAttachment from './AddAttachment.svelte';
import { setupLocales } from '../i18n';
import { apollo, setClient } from '../lib/support/apollo';

describe('<AddAttachment>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    const getDisplayNameAndCurrency = () => {
        const { getByTestId } = render(AddAttachment);
        const displayName = getByTestId('displayName');
        const saveButton: HTMLButtonElement = getByTestId('saveButton') as HTMLButtonElement;
        return { displayName, saveButton };
    };

    it('display name and currency are rendered, form is disabled', function () {
        const { displayName, saveButton } = getDisplayNameAndCurrency();
        expect(document.body.contains(displayName));
        expect(document.body.contains(saveButton));
        expect(saveButton.disabled);
    });

    it('after filling the form is enabled and is sent', function () {
        const { displayName, saveButton } = getDisplayNameAndCurrency();
        fireEvent.change(displayName, { target: { value: '23' } });
        expect(!saveButton.disabled);
        fireEvent.click(saveButton);
    });
});

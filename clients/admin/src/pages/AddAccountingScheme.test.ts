import { fireEvent, render } from '@testing-library/svelte';
import { expect } from 'chai';
import AddAccountingScheme from './AddAccountingScheme.svelte';
import { setupLocales } from '../i18n';
import { mock as mockCurrencies } from '../lib/queries/currencies';
import { apollo, setClient } from '../lib/support/apollo';

describe('<AddAccountingScheme>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    const getDisplayNameAndCurrency = () => {
        const { getByTestId } = render(AddAccountingScheme);
        const displayName = getByTestId('displayName');
        const currency = getByTestId('currencyId');
        const saveButton: HTMLButtonElement = getByTestId('saveButton') as HTMLButtonElement;
        return { displayName, currency, saveButton };
    };

    it('display name and currency are rendered, form is disabled', function () {
        const { displayName, currency, saveButton } = getDisplayNameAndCurrency();
        expect(document.body.contains(displayName));
        expect(document.body.contains(currency));
        expect(document.body.contains(saveButton));
        expect(saveButton.disabled);
    });

    it('after filling the form is enabled and is sent', function () {
        const { displayName, currency, saveButton } = getDisplayNameAndCurrency();
        fireEvent.change(displayName, { target: { value: '23' } });
        fireEvent.change(currency, {
            target: { value: mockCurrencies.data.currencies[0].displayName },
        });
        expect(!saveButton.disabled);
        fireEvent.click(saveButton);
    });
});

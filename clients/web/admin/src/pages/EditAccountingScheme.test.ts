import { render, RenderResult } from '@testing-library/svelte';
import { expect } from 'chai';
import EditAccountingScheme from './EditAccountingScheme.svelte';
import { setupLocales } from '../i18n';
import { mock1 } from '../lib/queries/accountingScheme';
import { apollo, setClient } from '../lib/support/apollo';

describe('<EditAccountingScheme>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    const getDisplayNameAndCurrency = (renderResult: RenderResult) => {
        const { getByTestId } = renderResult;
        const displayName: HTMLInputElement = getByTestId('displayName') as HTMLInputElement;
        const currency: HTMLInputElement = getByTestId('currencyId') as HTMLInputElement;
        const saveButton: HTMLButtonElement = getByTestId('saveButton') as HTMLButtonElement;
        return { displayName, currency, saveButton };
    };

    it('display name and currency are rendered, form is enabled', function (done) {
        const result = render(EditAccountingScheme, { params: { id: 1 } });
        setTimeout(() => {
            const { displayName, currency, saveButton } = getDisplayNameAndCurrency(result);
            expect(document.body.contains(displayName));
            expect(document.body.contains(currency));
            expect(document.body.contains(saveButton));
            expect(!saveButton.disabled);
            expect(displayName.value).to.equal(mock1.data.accountingScheme.displayName);
            const { getByDisplayValue } = result;
            const currencyDisplayName = getByDisplayValue(
                mock1.data.accountingScheme.currency.displayName,
            );
            expect(document.body.contains(currencyDisplayName));
            done();
        }, 200);
    });

    /*it('after filling the form is enabled and is sent', function () {
        const { displayName, currency, saveButton } = getDisplayNameAndCurrency();
        fireEvent.change(displayName, { target: { value: '23' } });
        fireEvent.change(currency, {
            target: { value: mockCurrencies.data.currencies[0].displayName },
        });
        expect(!saveButton.disabled);
        fireEvent.click(saveButton);
    });*/
});

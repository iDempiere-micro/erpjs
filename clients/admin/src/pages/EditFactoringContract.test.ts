import { fireEvent, render, RenderResult } from '@testing-library/svelte';
import { expect } from 'chai';
import EditFactoringContract from './EditFactoringContract.svelte';
import { setupLocales } from '../i18n';
import { mock as mockCurrencies } from '../lib/queries/currencies';
import { MOCKED_CUSTOMER_DISPLAY_NAME } from '../lib/queries/customers';
import type { GetByBoundAttribute } from '@testing-library/dom/types/queries';
import { mock1 } from '../lib/queries/factoringContract';

describe('<EditFactoringContract>', function () {
    before(() => {
        setupLocales();
    });

    const getDisplayNameAndCurrency = (renderResult: RenderResult) => {
        const { getByTestId } = renderResult;
        const displayName: HTMLInputElement = getByTestId('displayName') as HTMLInputElement;
        const currency: HTMLInputElement = getByTestId('currencies') as HTMLInputElement;
        const saveButton: HTMLButtonElement = getByTestId('saveButton') as HTMLButtonElement;
        return { displayName, currency, saveButton };
    };

    it('display name and currency are rendered, form is enabled', function (done) {
        const result = render(EditFactoringContract, { params: { id: 1 } });
        setTimeout(() => {
            const { displayName, currency, saveButton } = getDisplayNameAndCurrency(result);
            expect(document.body.contains(displayName));
            expect(document.body.contains(currency));
            expect(document.body.contains(saveButton));
            expect(!saveButton.disabled);
            expect(displayName.value).to.equal(mock1.data.factoringContract.displayName);
            const { getByText } = result;
            const currencyDisplayName = getByText(
                mock1.data.factoringContract.currency.displayName,
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

import { expect } from 'chai';
import EditFactoringContract from './EditFactoringContract.svelte';
import { setupLocales } from '../i18n';
import { mock1 } from '../lib/queries/factoringContract';
import { getFormElements } from '../lib/support/testHelpers';
import { MOCKED_CUSTOMER_DISPLAY_NAME } from '../lib/queries/customers';
import { mock as mockOrganizations } from '../lib/queries/organizations';
import { mock as mockFactoringProviders } from '../lib/queries/factoringProviders';

describe('<EditFactoringContract>', function () {
    before(() => {
        setupLocales();
    });

    const getElements = () =>
        getFormElements(
            EditFactoringContract,
            [
                'factoringProviderId',
                'customerId',
                'organizationId',
                'invoicePrintNote',
                'saveButton',
            ],
            { params: { id: 1 } },
        );

    it('display name and currency are rendered, form is enabled', async function () {
        const { elements, renderResult } = await getElements();
        const {
            factoringProviderId,
            customerId,
            organizationId,
            invoicePrintNote,
            saveButton,
        } = elements;
        expect(document.body.contains(factoringProviderId));
        expect(document.body.contains(customerId));
        expect(document.body.contains(organizationId));
        expect(document.body.contains(invoicePrintNote));
        expect(document.body.contains(saveButton));
        expect(!saveButton.disabled);
        expect(invoicePrintNote.value).to.equal(mock1.data.factoringContract.invoicePrintNote);
        const { getByText } = renderResult;
        const currencyDisplayName = getByText(MOCKED_CUSTOMER_DISPLAY_NAME);
        expect(document.body.contains(currencyDisplayName));
        const orgDisplayName = getByText(mockOrganizations.data.organizations[0].displayName);
        expect(document.body.contains(orgDisplayName));
        const fpDisplayName = getByText(
            mockFactoringProviders.data.factoringProviders[0].displayName,
        );
        expect(document.body.contains(fpDisplayName));
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

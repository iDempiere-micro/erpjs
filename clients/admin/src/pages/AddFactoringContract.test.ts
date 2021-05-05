import { fireEvent } from '@testing-library/svelte';
import { expect } from 'chai';
import AddFactoringContract from './AddFactoringContract.svelte';
import { setupLocales } from '../i18n';
import { mock as mockFactoringProviders } from '../lib/queries/factoringProviders';
import { mock as mockCustomers } from '../lib/queries/customers';
import { mock as mockOrganizations } from '../lib/queries/organizations';
import { getFormElements } from '../lib/support/testHelpers';
import { apollo, setClient } from '../lib/support/apollo';

describe('<AddFactoringContract>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    const getElements = () =>
        getFormElements(AddFactoringContract, [
            'factoringProviderId',
            'customerId',
            'organizationId',
            'invoicePrintNote',
            'saveButton',
        ]);

    it('elements are rendered, form is disabled', async function () {
        const { elements } = await getElements();
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
        expect(saveButton.disabled);
    });

    it('after filling the form is enabled and is sent', async function () {
        const { elements } = await getElements();
        const {
            factoringProviderId,
            customerId,
            organizationId,
            invoicePrintNote,
            saveButton,
        } = elements;
        fireEvent.change(invoicePrintNote, { target: { value: '23' } });
        fireEvent.change(factoringProviderId, {
            target: { value: mockFactoringProviders.data.factoringProviders[0].displayName },
        });
        fireEvent.change(customerId, {
            target: { value: mockCustomers.data.customers[0].displayName },
        });
        fireEvent.change(organizationId, {
            target: { value: mockOrganizations.data.organizations[0].displayName },
        });
        expect(!saveButton.disabled);
        fireEvent.click(saveButton);
    });
});

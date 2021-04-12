<script lang="ts">
    import type {
        OrganizationDetailPartsFragment,
        SaveOrganizationMutation,
        SaveOrganizationMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import { SAVE_ORGANIZATION } from '../../lib/queries/organization';

    export let organization: OrganizationDetailPartsFragment | undefined;
    let displayName = organization?.displayName;
    let contact = organization?.contact;
    let legalName = organization?.legalName;
    let registration = organization?.registration;
    let idNumber = organization?.idNumber;
    let vatNumber = organization?.vatNumber;
    let accountingSchemeId = organization?.accountingScheme?.id || 0; //TODO: fixme
    let currentInvoiceDocumentNumber = organization?.documentNumberSequences?.current;

    let bankAccountCustomerPrintableNumber = organization?.bankAccount?.bankAccountCustomerPrintableNumber || ''; //TODO: fixme
    let bankId = organization?.bankAccount?.bank?.id || 0; //TODO: fixme
    let bankAccountDisplyName = organization?.bankAccount?.displayName || ''; //TODO: fixme
    let iban = organization?.bankAccount?.iban || ''; //TODO: fixme
    let swift = organization?.bankAccount?.swift || ''; //TODO: fixme
    let city = organization?.legalAddress?.city || ''; //TODO: fixme
    let countryIsoCode = organization?.legalAddress?.country?.isoCode || ''; //TODO: fixme
    let line1 = organization?.legalAddress?.line1 || ''; //TODO: fixme
    let zipCode = organization?.legalAddress?.zipCode || ''; //TODO: fixme

    const myForm = form(
        () => ({
            displayName: {
                value: displayName,
                validators: ['required'],
            },
            contact: {
                value: contact,
                validators: ['required'],
            },
            legalName: {
                value: legalName,
                validators: ['required'],
            },
            registration: {
                value: registration,
                validators: ['required'],
            },
            idNumber: {
                value: idNumber,
                validators: ['required'],
            },
            vatNumber: {
                value: vatNumber,
                validators: [],
            },
            currentInvoiceDocumentNumber: {
                value: currentInvoiceDocumentNumber,
                validators: ['required'],
            },
        }),
        {
            initCheck: true,
            validateOnChange: false,
            stopAtFirstError: false,
            stopAtFirstFieldError: false,
        },
    );

    export const saveOrganizationMutation = mutation<
        SaveOrganizationMutation,
        SaveOrganizationMutationVariables
    >(SAVE_ORGANIZATION);

    const saveOrganization = async () => {
        if (displayName && contact && legalName && registration && idNumber && currentInvoiceDocumentNumber) {
            const { data } = await saveOrganizationMutation({
                variables: {
                    id: organization?.id,
                    displayName,
                    contact,
                    legalName,
                    registration,
                    idNumber,
                    vatNumber,
                    accountingSchemeId,
                    currentInvoiceDocumentNumber,
                    newBankAccount: {
                        bankAccountCustomerPrintableNumber,
                        bankId,
                        displayName: bankAccountDisplyName,
                        iban,
                        swift,
                    },
                    legalAddress: {
                        city,
                        countryIsoCode,
                        line1,
                        zipCode,
                    }
                },
            });
            console.log('*** organization created', data?.saveOrganization?.id);
        }
    };
</script>

<div class="mt-10 sm:mt-0">
    <div class="md:gap-6">
        <div class="mt-5 md:mt-0">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <SimpleTextBox
                        form={myForm}
                        title="Display name"
                        bind:value={displayName}
                        id="displayName"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Contact"
                        bind:value={contact}
                        id="contact"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Legal name"
                        bind:value={legalName}
                        id="legalName"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Registration"
                        bind:value={registration}
                        id="registration"
                    />
                    <SimpleTextBox
                        form={myForm}
                        title="ID Number"
                        bind:value={idNumber}
                        id="idNumber"
                    />
                    <SimpleTextBox
                        form={myForm}
                        title="VAT Number"
                        bind:value={vatNumber}
                        id="vatNumber"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title="Current Invoice Document Number"
                        bind:value={currentInvoiceDocumentNumber}
                        id="currentInvoiceDocumentNumber"
                    />
                    
                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            on:click|preventDefault={() => {
                                saveOrganization();
                            }}
                            disabled={false}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

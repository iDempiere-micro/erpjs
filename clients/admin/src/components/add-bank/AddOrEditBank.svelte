<script lang="ts">
    import type {
        BankDetailPartsFragment,
        SaveBankMutation,
        SaveBankMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import gql from 'graphql-tag';
    import { SAVE_BANK } from '../../lib/queries/bank';

    export let bank: BankDetailPartsFragment | undefined;
    let displayName = bank?.displayName;
    let bankIdentifierCode = bank?.bankIdentifierCode;

    const myForm = form(
        () => ({
            displayName: {
                value: displayName,
                validators: ['required'],
            },
            bankIdentifierCode: {
                value: bankIdentifierCode,
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

    export const saveBankMutation = mutation<SaveBankMutation, SaveBankMutationVariables>(
        SAVE_BANK,
    );

    const saveBank = async () => {
        if (displayName && bankIdentifierCode) {
            const { data } = await saveBankMutation({
                variables: {
                    id: bank?.id,
                    displayName,
                    bankIdentifierCode,
                },
            });
            console.log('*** bank created', data?.saveBank?.id);
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

                    <SimpleTextBox form={myForm} title="Identifier Code" bind:value={bankIdentifierCode} id="bankIdentifierCode" />

                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            on:click|preventDefault={() => {
                                saveBank();
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

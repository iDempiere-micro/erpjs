<script lang="ts">
    import type {
        BankDetailPartsFragment,
        SaveBankMutation,
        SaveBankMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import { SAVE_BANK } from '../../lib/queries/bank';
    import { _ } from 'svelte-i18n';
    import { push, urls } from '../../pages/pathAndSegment';
    import Button from '../../dsl/Button.svelte';

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
            await push(urls.banks.detail, data?.saveBank?.id);
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
                        title={$_('page.banks.add.displayName')}
                        bind:value={displayName}
                        id="displayName"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title={$_('page.banks.add.bankIdentifierCode')}
                        bind:value={bankIdentifierCode}
                        id="bankIdentifierCode"
                    />

                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <Button
                            on:click={() => {
                                saveBank();
                            }}
                            disabled={!$myForm.valid}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

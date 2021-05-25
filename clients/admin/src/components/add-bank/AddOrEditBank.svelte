<script lang="ts">
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from '../../absorb/svelte-forms/src';
    import { _ } from 'svelte-i18n';
    import { push, urls } from '../../pages/pathAndSegment';
    import Button from '../../dsl/Button.svelte';
    import type { BankDetail } from '../../lib/model/bank';
    import { bankService } from '../../lib/core';

    export let bank: BankDetail | undefined;
    let { id, displayName, bankIdentifierCode } = bank || {};

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

    const saveBank = async () => {
        if (displayName && bankIdentifierCode) {
            const { data } = await bankService.save({
                id,
                displayName,
                bankIdentifierCode,
            });
            if (data && data.saveBank) await push(urls.banks.detail, data.saveBank.id);
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

<script lang="ts">
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { _ } from 'svelte-i18n';
    import Button from '../../dsl/Button.svelte';
    import { push, urls } from '../../pages/pathAndSegment';
    import CurrencySelect from '../currencies/CurrencySelect.svelte';
    import type { AccountingSchemeDetail } from '../../lib/model/accountingScheme';
    import { accountingSchemeService } from '../../lib/core';
    import { form } from '../../absorb/svelte-forms/src';
    import type { Opt } from '../../lib/support/types';

    /**
     * The accounting scheme to be edit or `undefined` if adding a new accounting scheme
     */
    export let accountingScheme: AccountingSchemeDetail | undefined;
    let { id, displayName, currency } = accountingScheme || {};
    let currencyId: Opt<number> = (currency || {}).id;

    const navigateToTheDetail = () =>
        accountingScheme && push(urls.accountingSchemes.detail, accountingScheme.id);

    const handleSelectCurrency = (id: Opt<number>) => {
        currencyId = id;
        myForm.validate();
    };
    const handleClearCurrency = () => {
        currencyId = undefined;
        myForm.validate();
    };

    const myForm = form(
        () => ({
            displayName: {
                value: displayName,
                validators: ['required'],
            },
            currencyId: {
                value: currencyId,
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

    const saveAccountingScheme = async () => {
        if (displayName && currencyId) {
            const { data } = await accountingSchemeService.save({
                id,
                displayName,
                currencyId,
            });
            if (data && data.saveAccountingScheme)
                await push(urls.accountingSchemes.detail, data.saveAccountingScheme.id);
        } else console.error('saveAccountingScheme called with invalid parameters');
    };
</script>

<form autocomplete="off">
    <div class="mt-10 sm:mt-0">
        <div class="md:grid md:grid-cols-3 md:gap-6">
            <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                    <h3 class="text-lg font-medium leading-6 text-gray-900">
                        {$_('page.accountingSchemes.add.internalInformation')}
                    </h3>
                    <p class="mt-1 text-sm text-gray-600">
                        {$_('page.accountingSchemes.add.description.internalInformation')}
                    </p>
                </div>
            </div>
            <div class="mt-5 md:mt-0 md:col-span-2">
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6">
                                <SimpleTextBox
                                    form={myForm}
                                    title={$_('page.accountingSchemes.add.displayName')}
                                    bind:value={displayName}
                                    id="displayName"
                                    hideWrapper={true}
                                />
                            </div>
                            <div class="col-span-6">
                                <CurrencySelect
                                    onSelect={handleSelectCurrency}
                                    id="currencyId"
                                    label={$_('page.accountingSchemes.add.currency')}
                                    {currencyId}
                                    form={myForm}
                                />
                            </div>
                            <div class="grid-cols-1">
                                <Button on:click={saveAccountingScheme} disabled={!$myForm.valid} />
                            </div>
                            {#if accountingScheme}
                                <div class="grid-cols-1">
                                    <Button
                                        label={$_('actions.cancel')}
                                        primary={false}
                                        on:click={() => {
                                            navigateToTheDetail();
                                        }}
                                    />
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

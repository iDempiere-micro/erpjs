<script lang="ts">
    import Select from 'svelte-select';
    import type {
        AccountingSchemeDetailPartsFragment,
        SaveAccountingSchemeMutation,
        SaveAccountingSchemeMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import { SAVE_ACCOUNTING_SCHEME } from '../../lib/queries/accountingScheme';
    import { currenciesStore, ensureCurrenciesStore, mapCurrencies } from '../../lib/currency';
    import type { OnSelectParam, SelectItem } from '../../lib/select';
    import { _ } from 'svelte-i18n';
    import Button from '../../dsl/Button.svelte';

    /**
     * The accounting scheme to be edit or `undefined` if adding a new accounting scheme
     */
    export let accountingScheme: AccountingSchemeDetailPartsFragment | undefined;
    let displayName = accountingScheme?.displayName;
    let currencyIsoCode = accountingScheme?.currency?.isoCode;

    let selectedCurrencyValue: SelectItem | undefined;

    const handleSelectCurrency = (event: OnSelectParam) => {
        currencyIsoCode = '' + event.detail.value;
        myForm.validate();
    };

    ensureCurrenciesStore();

    $: {
        if (currencyIsoCode) {
            const found = $currenciesStore.currencies.find((x) => x?.isoCode === currencyIsoCode);
            if (found) {
                selectedCurrencyValue = mapCurrencies([found])[0];
            }
        }
    }

    const myForm = form(
        () => ({
            displayName: {
                value: displayName,
                validators: ['required'],
            },
            currencyIsoCode: {
                value: currencyIsoCode,
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

    export const saveAccountingSchemeMutation = mutation<
        SaveAccountingSchemeMutation,
        SaveAccountingSchemeMutationVariables
    >(SAVE_ACCOUNTING_SCHEME);

    const saveAccountingScheme = async () => {
        if (displayName && currencyIsoCode) {
            const { data } = await saveAccountingSchemeMutation({
                variables: {
                    id: accountingScheme?.id,
                    displayName,
                    currencyIsoCode,
                },
            });
            console.log('*** accountingScheme created', data?.saveAccountingScheme?.id);
        }
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
                                <label
                                    for="currencies"
                                    class="block text-sm font-medium text-gray-700"
                                    >{$_('page.accountingSchemes.add.currency')}</label
                                >
                                <Select
                                    inputAttributes={{
                                        id: 'currencies',
                                        'data-testid': 'currencies',
                                    }}
                                    items={mapCurrencies($currenciesStore.currencies)}
                                    selectedValue={selectedCurrencyValue}
                                    on:select={handleSelectCurrency}
                                />
                                {#if $myForm.fields.currencyIsoCode.errors.includes('required')}
                                    <label
                                        for="currencies"
                                        class="block text-sm font-small text-red-700"
                                        >{$_('validator.required')}</label
                                    >
                                {/if}
                            </div>
                            <div class="px-4 py-3 bg-white text-right sm:px-6">
                                <Button
                                    on:click={() => {
                                        saveAccountingScheme();
                                    }}
                                    disabled={!$myForm.valid}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>

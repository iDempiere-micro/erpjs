<script lang="ts">
    import type {
        CurrencyDetailPartsFragment,
        SaveCurrencyMutation,
        SaveCurrencyMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import { SAVE_CURRENCY } from '../../lib/queries/currency';
    import { push, urls } from '../../pages/pathAndSegment';
    import Button from '../../dsl/Button.svelte';
    import { _ } from 'svelte-i18n';

    export let currency: CurrencyDetailPartsFragment | undefined;
    let displayName = currency?.displayName;
    let isoCode = currency?.isoCode;

    const myForm = form(
        () => ({
            displayName: {
                value: displayName,
                validators: ['required'],
            },
            isoCode: {
                value: isoCode,
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

    export const saveCurrencyMutation = mutation<
        SaveCurrencyMutation,
        SaveCurrencyMutationVariables
    >(SAVE_CURRENCY);

    const saveCurrency = async () => {
        if (displayName && isoCode) {
            const { data } = await saveCurrencyMutation({
                variables: {
                    id: currency?.id,
                    displayName,
                    isoCode,
                },
            });
            await push(urls.currencies.detail, data?.saveCurrency?.id);
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
                        title={$_('page.currencies.add.displayName')}
                        bind:value={displayName}
                        id="displayName"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title={$_('page.currencies.add.isoCode')}
                        bind:value={isoCode}
                        id="isoCode"
                    />

                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <Button
                            on:click={() => {
                                saveCurrency();
                            }}
                            disabled={!$myForm.valid}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

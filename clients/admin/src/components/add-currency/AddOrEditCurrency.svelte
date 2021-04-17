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
            console.log('*** currency created', data?.saveCurrency?.id);
        }
    };
</script>

<div class="mt-10 sm:mt-0">
    <div class="md:gap-6">
        <div class="mt-5 md:mt-0">
            <div class="shadow sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <SimpleTextBox
                        form={myForm}
                        title="Display name"
                        bind:value={displayName}
                        id="displayName"
                    />

                    <SimpleTextBox form={myForm} title="SKU" bind:value={isoCode} id="isoCode" />

                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            on:click|preventDefault={() => {
                                saveCurrency();
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

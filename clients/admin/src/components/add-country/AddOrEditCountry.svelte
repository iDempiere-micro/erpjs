<script lang="ts">
    import type {
        CountryDetailPartsFragment,
        SaveCountryMutation,
        SaveCountryMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import gql from 'graphql-tag';

    const SAVE_PRODUCT = gql`
        mutation SaveCountry($id: Int, $displayName: String!, $isoCode: String!) {
            saveCountry(args: { id: $id, displayName: $displayName, isoCode: $isoCode }) {
                id
            }
        }
    `;

    export let country: CountryDetailPartsFragment | undefined;
    let displayName = country?.displayName;
    let isoCode = country?.isoCode;

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

    export const saveCountryMutation = mutation<SaveCountryMutation, SaveCountryMutationVariables>(
        SAVE_PRODUCT,
    );

    const saveCountry = async () => {
        if (displayName && isoCode) {
            const { data } = await saveCountryMutation({
                variables: {
                    id: country?.id,
                    displayName,
                    isoCode,
                },
            });
            console.log('*** country created', data?.saveCountry?.id);
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
                                saveCountry();
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

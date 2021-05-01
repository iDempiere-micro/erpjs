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
    import { _ } from 'svelte-i18n';
    import Button from '../../dsl/Button.svelte';
    import { push, urls } from '../../pages/pathAndSegment';

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
            await push(urls.countries.detail, data?.saveCountry?.id);
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
                        title={$_('page.countries.add.displayName')}
                        bind:value={displayName}
                        id="displayName"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title={$_('page.countries.add.isoCode')}
                        bind:value={isoCode}
                        id="isoCode"
                    />

                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <Button
                            on:click={() => {
                                saveCountry();
                            }}
                            disabled={!$myForm.valid}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script lang="ts">
    import type {
        ProductDetailPartsFragment,
        SaveProductMutation,
        SaveProductMutationVariables,
    } from '../../generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import gql from 'graphql-tag';

    const SAVE_PRODUCT = gql`
        mutation SaveProduct($id: Int, $displayName: String!, $sku: String!) {
            saveProduct(args: { id: $id, displayName: $displayName, sku: $sku }) {
                id
            }
        }
    `;

    export let product: ProductDetailPartsFragment | undefined;
    let displayName = product?.displayName;
    let sku = product?.sku;

    const myForm = form(
        () => ({
            displayName: {
                value: displayName,
                validators: ['required'],
            },
            sku: {
                value: sku,
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

    export const saveProductMutation = mutation<SaveProductMutation, SaveProductMutationVariables>(
        SAVE_PRODUCT,
    );

    const saveProduct = async () => {
        if (displayName && sku) {
            const { data } = await saveProductMutation({
                variables: {
                    id: product?.id,
                    displayName,
                    sku,
                },
            });
            console.log('*** product created', data?.saveProduct?.id);
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

                    <SimpleTextBox form={myForm} title="SKU" bind:value={sku} id="sku" />

                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            on:click|preventDefault={() => {
                                saveProduct();
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

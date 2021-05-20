<script lang="ts">
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from '../../absorb/svelte-forms/src';

    import type { ProductDetail } from '../../lib/model/product';
    import { productService } from '../../lib/core';
    import { push, urls } from '../../pages/pathAndSegment';
    import Button from '../../dsl/Button.svelte';

    export let product: ProductDetail | undefined;
    let { id, displayName, sku } = product || {};

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

    const saveProduct = async () => {
        if (displayName && sku) {
            const { data } = await productService.save({
                id,
                displayName,
                sku,
            });
            if (data && data.saveProduct) await push(urls.products.detail, data.saveProduct.id);
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
                        <Button
                            on:click={() => {
                                saveProduct();
                            }}
                            disabled={!$myForm.valid}
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

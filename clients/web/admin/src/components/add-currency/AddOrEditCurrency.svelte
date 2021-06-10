<script lang="ts">
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { form } from '../../absorb/svelte-forms/src';

    import { push, urls } from '../../pages/pathAndSegment';
    import Button from '../../dsl/Button.svelte';
    import { _ } from 'svelte-i18n';
    import type { CurrencyDetail } from '../../lib/model/currency';
    import { currencyService } from '../../lib/core';

    export let currency: CurrencyDetail | undefined;
    let { id, displayName, isoCode } = currency || {};

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

    const saveCurrency = async () => {
        if (displayName && isoCode) {
            const { data } = await currencyService.save({
                id,
                displayName,
                isoCode,
            });
            if (data && data.saveCurrency) await push(urls.currencies.detail, data.saveCurrency.id);
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

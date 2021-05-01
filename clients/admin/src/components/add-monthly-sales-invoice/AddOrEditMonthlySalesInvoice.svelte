<script lang="ts">
    import gql from 'graphql-tag';

    import { form } from 'svelte-forms';
    import { mutation } from 'svelte-apollo';
    import type {
        CreateMonthlyInvoiceMutation,
        CreateMonthlyInvoiceMutationVariables,
    } from 'src/generated/graphql';
    import SimpleTextBox from '../../molecules/form/SimpleTextBox.svelte';
    import { authStore } from '../../lib/support/auth';
    import { downloadInvoice } from '../../lib/core/salesInvoices';
    import { _ } from 'svelte-i18n';

    const ADD_MONTHLY_SALES_INVOICE = gql`
        mutation CreateMonthlyInvoice(
            $totalHours: Float!
            $dailyRate: Float!
            $organizationDivider: [IdAndNumber!]!
            $year: Int!
            $month: Int!
            $day: Int!
            $eurToCzkRate: Float!
            $narration: String!
        ) {
            createMonthlyInvoice(
                args: {
                    totalHours: $totalHours
                    dailyRate: $dailyRate
                    organizationDivider: $organizationDivider
                    year: $year
                    month: $month
                    day: $day
                    eurToCzkRate: $eurToCzkRate
                    narration: $narration
                }
            ) {
                id
            }
        }
    `;

    let invoiceIds: number[] | undefined; // = [1,2,3];

    let totalHours: number;
    let dailyRate: number;
    let eurToCzkRate: number;
    let narration: string;
    let nuczdivider: number;
    let invoiceDate: string; // 2021-02-28

    const addMonthlySalesInvoice = mutation<
        CreateMonthlyInvoiceMutation,
        CreateMonthlyInvoiceMutationVariables
    >(ADD_MONTHLY_SALES_INVOICE);

    const myForm = form(
        () => ({
            totalHours: {
                value: totalHours,
                validators: ['required'],
            },
            dailyRate: { value: dailyRate, validators: ['required'] },
            eurToCzkRate: { value: eurToCzkRate, validators: ['required'] },
            narration: { value: narration, validators: ['required'] },

            nuczdivider: { value: nuczdivider, validators: ['required'] },
            invoiceDate: { value: invoiceDate, validators: ['required'] },
        }),
        {
            initCheck: true,
            validateOnChange: false,
            stopAtFirstError: false,
            stopAtFirstFieldError: false,
        },
    );

    const createMonthlySalesInvoice = async () => {
        const [year, month, day] = invoiceDate.split('-').map((x) => +x);
        // TODO: remove this leaking abstraction
        /*
              {
        "id": 1,
        "displayName": "NUCZ"
      },
      {
        "id": 2,
        "displayName": "DP"
      }
         */
        const organizationDivider = [
            { id: 1, value: +nuczdivider },
            { id: 2, value: 1 - +nuczdivider },
        ];

        const { data } = await addMonthlySalesInvoice({
            variables: {
                totalHours: +totalHours,
                dailyRate: +dailyRate,
                organizationDivider,
                year,
                month,
                day,
                eurToCzkRate: +eurToCzkRate,
                narration,
            },
        });
        invoiceIds = data?.createMonthlyInvoice?.map((x) => x.id);
        console.log('*** invoices created', invoiceIds);
    };

    const download = (id: number) =>
        downloadInvoice(process.env.API_BASE_URL, $authStore?.token, id);
</script>

<div class="mt-10 sm:mt-0">
    <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
                <h3 class="text-lg font-medium leading-6 text-gray-900">
                    {$_('page.salesInvoices.monthly.add.invoicingInformation')}
                </h3>
                <p class="mt-1 text-sm text-gray-600" />
            </div>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <SimpleTextBox
                        form={myForm}
                        title={$_('page.salesInvoices.monthly.add.totalHours')}
                        bind:value={totalHours}
                        id="totalHours"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title={$_('page.salesInvoices.monthly.add.dailyRate')}
                        bind:value={dailyRate}
                        id="dailyRate"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title={$_('page.salesInvoices.monthly.add.orgDivider')}
                        bind:value={nuczdivider}
                        id="nuczdivider"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title={$_('page.salesInvoices.monthly.add.eur2czk')}
                        bind:value={eurToCzkRate}
                        id="eurToCzkRate"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title={$_('page.salesInvoices.monthly.add.narration')}
                        bind:value={narration}
                        id="narration"
                    />

                    <SimpleTextBox
                        form={myForm}
                        title={$_('page.salesInvoices.monthly.add.invoiceDate')}
                        bind:value={invoiceDate}
                        id="invoiceDate"
                        type="date"
                    />

                    <div class="px-4 py-3 bg-white text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            on:click|preventDefault={createMonthlySalesInvoice}
                            disabled={!$myForm.valid}
                        >
                            {$_('page.salesInvoices.monthly.add.save')}
                        </button>
                    </div>

                    {#if invoiceIds}
                        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt class="text-sm font-medium text-gray-500">
                                {$_('page.salesInvoices.monthly.add.generatedInvoices')}
                            </dt>
                            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <ul
                                    class="border border-gray-200 rounded-md divide-y divide-gray-200"
                                >
                                    {#each invoiceIds as invoiceId}
                                        <li
                                            class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                                        >
                                            <div class="w-0 flex-1 flex items-center">
                                                <!-- Heroicon name: paper-clip -->
                                                <svg
                                                    class="flex-shrink-0 h-5 w-5 text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                                <span class="ml-2 flex-1 w-0 truncate">
                                                    {$_('page.salesInvoices.monthly.add.invoice')}
                                                    {invoiceId}
                                                </span>
                                            </div>
                                            <div class="ml-4 flex-shrink-0">
                                                <a
                                                    on:click={() => download(invoiceId)}
                                                    class="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    {$_('page.salesInvoices.monthly.add.download')}
                                                </a>
                                            </div>
                                        </li>
                                    {/each}
                                </ul>
                            </dd>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

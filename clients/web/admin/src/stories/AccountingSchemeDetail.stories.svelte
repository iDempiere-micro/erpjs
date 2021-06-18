<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AccountingSchemeDetail from '../components/accountingScheme-detail/AccountingSchemeDetail.svelte';
    import { setupLocales } from '../i18n';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";
    import {mock1} from "../lib/queries/accountingScheme";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta
    title="Components/Accounting Scheme/Detail"
    component={AccountingSchemeDetail}
    argTypes={{}}
/>

<Template let:args>
    <AccountingSchemeDetail data={mock1.data.accountingScheme} {...args} />
</Template>

<Story name="Detail" />

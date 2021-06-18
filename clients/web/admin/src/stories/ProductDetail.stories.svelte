<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import ProductDetail from '../components/product-detail/ProductDetail.svelte';
    import { setupLocales } from '../i18n';
    import {apollo, setClient} from "@eolerp/common";
    import {mocks} from "../lib/support/mocks";
    import {mock} from "../lib/queries/products";

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));

    setupLocales();
</script>

<Meta title="Components/Product/Detail" component={ProductDetail} argTypes={{}} />

<Template let:args>
    <ProductDetail {...args} product={mock.data.products[0]} />
</Template>

<Story name="Detail" />

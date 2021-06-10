<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import ProductList from '../components/products/ProductList.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/products';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Product/List" component={ProductList} argTypes={{}} />

<Template let:args>
    <ProductList {...args} />
</Template>

<Story name="List" args={{ products: mock.data.products }} />

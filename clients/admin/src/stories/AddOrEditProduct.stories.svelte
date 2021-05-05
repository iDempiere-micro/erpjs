<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import AddOrEditProduct from '../components/add-product/AddOrEditProduct.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/products';

    setClient(apollo(true));
    setupLocales();
</script>

<Meta title="Components/Product/Add&Edit" component={AddOrEditProduct} argTypes={{}} />

<Template let:args>
    <AddOrEditProduct {...args} />
</Template>

<Story name="Add" />
<Story
    name="Edit"
    args={{
        product: mock.data.products[0],
    }}
/>

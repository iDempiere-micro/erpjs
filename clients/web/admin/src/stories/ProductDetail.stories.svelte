<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import ProductDetail from '../components/product-detail/ProductDetail.svelte';
    import { apollo } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../../build/dist/lib/queries/products';

    const client = apollo(true);

    setupLocales();
</script>

<Meta title="Components/Product/Detail" component={ProductDetail} argTypes={{}} />

<Template let:args>
    <ProductDetail {...args} product={mock.data.products[0]} />
</Template>

<Story name="Detail" />

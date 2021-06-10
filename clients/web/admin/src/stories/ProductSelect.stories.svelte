<script lang="ts">
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import ProductSelect from '../components/products/ProductSelect.svelte';
    import { apollo, setClient } from '../lib/support/apollo';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/products';

    setClient(apollo(true));
    setupLocales();

    const defaultArgs = {
        onSelect: (productId) => {
            console.log('onSelect', productId);
        },
        id: 'productId',
        label: 'Product',
        productId: mock.data.products[0].id,
    };
    const requiredError = {
        form: {
            fields: {
                productId: {
                    errors: ['required'],
                },
            },
        },
    };
</script>

<Meta title="Components/Product/Select" component={ProductSelect} argTypes={{}} />

<Template let:args>
    <ProductSelect {...args} />
</Template>

<Story name="Select" args={defaultArgs} />

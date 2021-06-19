<script>
    import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
    import ProductList from '../components/products/ProductList.svelte';
    import { apollo, setClient } from '@eolerp/common';
    import { setupLocales } from '../i18n';
    import { mock } from '../lib/queries/products';

    setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    setupLocales();
</script>

<Meta title="Components/Product/List" component={ProductList} argTypes={{}} />

<Template let:args>
    <ProductList {...args} />
</Template>

<Story name="List" args={{ products: mock.data.products }} />

import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import ProductDetail from './ProductDetail.svelte';
import { setupLocales } from '../i18n';
import { mock } from '../lib/queries/products';
import { apollo, setClient } from '@eolerp/common';
import { mocks } from '../lib/support/mocks';

describe('<ProductDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo({ forceMock: true, url:'', token:'', mockDefs:mocks }));
    });

    it('renders accounting scheme detail', function (done) {
        const { getByText } = render(ProductDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock.data.products[0].displayName);
            expect(document.body.contains(displayName));
            const currency = getByText(mock.data.products[0].sku);
            expect(document.body.contains(currency));
            done();
        }, 400);
    });
});

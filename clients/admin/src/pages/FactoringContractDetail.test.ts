import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import FactoringContractDetail from './FactoringContractDetail.svelte';
import { setupLocales } from '../i18n';
import { mock1 } from '../lib/queries/factoringContract';

describe('<FactoringContractDetail>', function () {
    before(() => {
        setupLocales();
    });

    it('renders accounting scheme detail', function (done) {
        const { getByText } = render(FactoringContractDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(
                mock1.data.factoringContract.factoringProvider.displayName,
            );
            expect(document.body.contains(displayName));
            const currency = getByText(mock1.data.factoringContract.customer.displayName);
            expect(document.body.contains(currency));
            done();
        }, 200);
    });
});

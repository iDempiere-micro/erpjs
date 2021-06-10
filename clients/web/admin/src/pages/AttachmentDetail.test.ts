import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import AttachmentDetail from './AttachmentDetail.svelte';
import { setupLocales } from '../i18n';
import { mock1 } from '../lib/queries/attachment';
import { apollo, setClient } from '../lib/support/apollo';

describe('<AttachmentDetail>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders accounting scheme detail', function (done) {
        const { getByText } = render(AttachmentDetail, { params: { id: 1 } });

        setTimeout(() => {
            const displayName = getByText(mock1.data.attachment.displayName);
            expect(document.body.contains(displayName));
            done();
        }, 200);
    });
});

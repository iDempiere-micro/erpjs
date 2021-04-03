import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import Menu from './Menu.svelte';
import { urls } from './pages/pathAndSegment';
import { setupLocales } from './i18n';

describe('<Menu>', function () {
    before(() => {
        setupLocales();
    });

    it('renders menu on the homepage', function (done) {
        const { getByTestId, getByText } = render(Menu, { segment: '', mobile: false });
        setTimeout(() => {
            const menu2 = getByTestId('menu-2-desktop');
            expect(document.body.contains(menu2));
            expect((menu2 as any).href).to.include('/' + urls.customer.list);
            done();
        }, 200);
    });
});

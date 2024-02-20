import { render } from '@testing-library/svelte';
import { setViewport } from '@web/test-runner-commands';
import { expect } from 'chai';
import { setupLocales } from './i18n';
import { apollo, setClient } from './lib/support/apollo';
import Nav from './Nav.svelte';

describe('<Nav>', function () {
    before(() => {
        setupLocales();
        setClient(apollo(true));
    });

    it('renders desktop menu on the homepage by default', function (done) {
        const { getByTestId, getByText } = render(Nav, { segment: '' });
        setTimeout(() => {
            const menu1 = getByTestId('menu-1-desktop');
            expect(document.body.contains(menu1));
            done();
        }, 1000);
    });

    it('renders mobile menu on the homepage on smaller screen', function (done) {
        setViewport({ width: 360, height: 640 }).then(() => {
            const { getByTestId, getByText } = render(Nav, { segment: '' });
            setTimeout(() => {
                const menu1 = getByTestId('menu-1-mobile');
                expect(document.body.contains(menu1));
                done();
            }, 1000);
        });
    });
});

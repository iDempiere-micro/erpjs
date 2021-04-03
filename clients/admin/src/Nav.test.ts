import { render } from '@testing-library/svelte';
import { expect } from 'chai';
import Nav from './Nav.svelte';
import { setViewport } from '@web/test-runner-commands';
import { setupLocales } from './i18n';

describe('<Nav>', function () {
    before(() => {
        setupLocales();
    });

    it('renders desktop menu on the homepage by default', function (done) {
        const { getByTestId, getByText } = render(Nav, { segment: '' });
        setTimeout(() => {
            const menu1 = getByTestId('menu-1-desktop');
            expect(document.body.contains(menu1));
            done();
        }, 200);
    });

    it('renders mobile menu on the homepage on smaller screen', function (done) {
        setViewport({ width: 360, height: 640 }).then(() => {
            const { getByTestId, getByText } = render(Nav, { segment: '' });
            setTimeout(() => {
                const menu1 = getByTestId('menu-1-mobile');
                expect(document.body.contains(menu1));
                done();
            }, 200);
        });
    });
});

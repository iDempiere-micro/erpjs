import type { SvelteAction } from '../lib/support/types';

// Thanks Lagden! https://svelte.dev/repl/61d9178d2b9944f2aa2bfe31612ab09f?version=3.6.7
function ripple(color: string, centered: boolean) {
    return function (event: any) {
        const target = event.currentTarget;
        const circle = document.createElement('span');
        const d = Math.max(target.clientWidth, target.clientHeight);

        const removeCircle = () => {
            circle.remove();
            circle.removeEventListener('animationend', removeCircle);
        };

        circle.addEventListener('animationend', removeCircle);
        circle.style.width = circle.style.height = `${d}px`;
        const rect = target.getBoundingClientRect();

        if (centered) {
            circle.classList.add(
                'absolute',
                'top-0',
                'left-0',
                'ripple-centered',
                `bg-${color}-transDark`,
            );
        } else {
            circle.style.left = `${event.clientX - rect.left - d / 2}px`;
            circle.style.top = `${event.clientY - rect.top - d / 2}px`;

            circle.classList.add('ripple-normal', `bg-${color}-trans`);
        }

        circle.classList.add('ripple');

        target.appendChild(circle);
    };
}

export default function createRipple<T = any>(
    color = 'primary',
    centered = false,
): SvelteAction<[], T> {
    return function (node: T) {
        const onMouseDown = ripple(color, centered);
        (node as any).addEventListener('mousedown', onMouseDown);

        return {
            destroy: () => (node as any).removeEventListener('mousedown', onMouseDown),
        };
    };
}

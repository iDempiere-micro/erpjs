import { render, RenderOptions } from '@testing-library/svelte';
import type { SvelteComponent } from 'svelte';
import type { GetFormElementsResult, SvelteComponentOptions } from './types';

export const getFormElements = async (
    page: typeof SvelteComponent,
    ids: string[],
    componentOptions?: SvelteComponentOptions,
    renderOptions?: Omit<RenderOptions, 'queries'>,
): Promise<GetFormElementsResult> => {
    const renderResult = render(page, componentOptions, renderOptions);
    const { findByTestId } = renderResult;
    const elements: any = {};
    for (const id of ids) {
        elements[id] = await findByTestId(id);
    }
    return {
        elements,
        renderResult,
    };
};

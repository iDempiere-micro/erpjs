import { render, RenderOptions, RenderResult } from '@testing-library/svelte';
import type { SvelteComponent } from 'svelte';

export interface GetFormElementsResult {
    elements: any;
    renderResult: RenderResult;
}

type SvelteComponentOptions = any;

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

import type { Writable } from 'svelte/store';
import type { RenderResult } from '@testing-library/svelte';

export type Opt<T> = T | undefined;
export type Store<T> = Writable<T> & { get(): T };

export interface GetFormElementsResult {
    elements: any;
    renderResult: RenderResult;
}

export type SvelteComponentOptions = any;
export type SvelteAction<U extends any[], El extends any> = (
    node: El,
    ...args: U
) => {
    update?: (...args: U) => void;
    destroy?: () => void;
} | void;

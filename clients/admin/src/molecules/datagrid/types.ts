import type { SvelteComponent } from 'svelte';

export interface Column {
    name: string;
    cellComponent: typeof SvelteComponent;
}

export interface RowAction {
    name: string;
    url?: string;
    onclick?: (row: any) => void;
}

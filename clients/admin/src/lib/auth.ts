import { writable } from 'svelte/store';

export interface WithToken {
    token: string;
}

export const authStore= writable<WithToken | null>(null); // start with no user

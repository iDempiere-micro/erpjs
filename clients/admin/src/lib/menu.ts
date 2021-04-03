import { writable } from 'svelte/store';

export const menuStore = writable<any>(null); // start with no menu
export const profileMenuOpened = writable<boolean>(false);

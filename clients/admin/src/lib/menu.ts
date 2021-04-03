import { writable } from 'svelte/store';
import { store } from './store';

export const menuStore = store<any>(null); // start with no menu
export const profileMenuOpened = writable<boolean>(false);

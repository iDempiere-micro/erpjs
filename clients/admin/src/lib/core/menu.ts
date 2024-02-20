import { writable } from 'svelte/store';
import type { MenuListPartsFragment } from '../../generated/graphql';
import { store } from '../support/store';

export const menuStore = store<MenuListPartsFragment | undefined>(undefined); // start with no menu
export const profileMenuOpened = writable<boolean>(false);

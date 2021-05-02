import type { Store } from '../support/store';
import { store } from '../support/store';
import type { DocumentNode } from '@apollo/client/core';
import { query } from '../../absorb/svelte-apollo';
import type { EntityRow } from '../model/model';

/**
 * Content of the store for list of items
 */
export interface WithEntityRow<T> {
    loaded: boolean;
    data: T[];
}

/**
 * Content of the store for an item detail
 * Please note for the code simplification in the entity detail page
 * we pretend the data is always present although it is true only if `loaded` is `true`.
 * See https://github.com/iDempiere-micro/erpjs/wiki/How-to-write-a-detail-entity-page
 */
export interface WithEntity<T extends EntityRow> {
    loaded: boolean;
    data: T;
}

/**
 * return a new store for the list of items
 */
export function initRows<T>(): Store<WithEntityRow<T>> {
    return store<WithEntityRow<T>>({
        loaded: false,
        data: [],
    });
}

/**
 * return a new store store for the item detail
 * @param safeEmptyValue - an empty value that is safe to dereference in the detail page
 * see https://github.com/iDempiere-micro/erpjs/issues/88
 * read more at https://github.com/iDempiere-micro/erpjs/wiki/How-to-write-a-detail-entity-page
 */
export function initDetail<T>(safeEmptyValue: T): Store<WithEntity<T>> {
    return store<WithEntity<T>>({
        loaded: false,
        data: safeEmptyValue,
    });
}

/**
 * Invalidate the store for the list of items in a case an item was added or deleted
 * @param storeInstance - the store to invalidate
 */
export function invalidate<T>(storeInstance: Store<WithEntityRow<T>>) {
    storeInstance.update((x) => ({ loaded: false, data: [] }));
}

/**
 * Load the entity row store if not loaded (hence `ensure` and not `load`)
 * @param storeInstance - the store to load
 * @param gql - the GQL document to use for loading
 * @param convert - the conversion function to convert the raw query result with rows to the entity`Row` type array
 */
export function ensureEntityRowStore<T, Q>(
    storeInstance: Store<WithEntityRow<T>>,
    gql: DocumentNode,
    convert: (result: Q) => T[],
) {
    if (storeInstance.get().loaded) return;

    const loadResult = query<Q>(gql);
    loadResult.subscribe((value) => {
        if (value?.error) throw new Error(`${value?.error}`);
        if (value?.data) {
            const data = convert(value.data);

            storeInstance.update((x) => ({
                loaded: data && data.length > 0,
                data,
            }));
        }
    });
}

/**
 * Load the entity detail store if not loaded (hence `ensure` and not `load`)
 * @param storeInstance - the entity detail store
 * @param gql - the GQL document to use for loading
 * @param convert - the conversion function to convert the raw query result to the entity`Detail` type
 */
export function ensureEntityStore<T, Q>(
    storeInstance: Store<WithEntity<T>>,
    gql: DocumentNode,
    convert: (result: Q) => T,
) {
    if (storeInstance.get().loaded) return;

    const loadResult = query<Q>(gql);
    loadResult.subscribe((value) => {
        if (value?.error) throw new Error(`${value?.error}`);
        if (value?.data) {
            const data = convert(value.data);

            storeInstance.update(() => ({
                loaded: !!data,
                data,
            }));
        }
    });
}

/**
 * Unload the detail entity; use when destroying the entity detail page
 * @param storeInstance
 */
export function destroy<T>(storeInstance: Store<WithEntity<T>>) {
    // OK this needs a little bit of explanation
    // this looks crazy, but it is supposed to work exactly like this. We had data defined as T
    // and use the safeEmptyValue to be able to safely dereference the values in detail and not been
    // forced to write a?.b that storybook does not like
    // but in case the entity detail is not shown anymore so we want everyone that would expect that
    // to fail
    storeInstance.update(() => ({ loaded: false, data: undefined as any }));
}

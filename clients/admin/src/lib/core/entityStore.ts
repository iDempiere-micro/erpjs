import type { Store } from '../support/store';
import { store } from '../support/store';
import type { DocumentNode } from '@apollo/client/core';
import { query } from '../../absorb/svelte-apollo';

/**
 * Content of the store for list of items
 */
export interface WithEntityRow<T> {
    loaded: boolean;
    data: T[];
}

/**
 * Content of the store for an item detail
 */
export interface WithEntity<T> {
    loaded: boolean;
    data: T;
}

/**
 * return a new store store for the list of items
 */
export function initRows<T>(): Store<WithEntityRow<T>> {
    return store<WithEntityRow<T>>({
        loaded: false,
        data: [],
    });
}

/**
 * return a new store store for the item detail
 * @param safeEmptyValue - an empty value 
 */
export function initDetail<T>(safeEmptyValue:T): Store<WithEntity<T>> {
    return store<WithEntity<T>>({
        loaded: false,
        data: safeEmptyValue,
    });
}

/**
 * Invalid the
 * @param storeInstance
 */
export function invalidate<T>(
    storeInstance: Store<WithEntityRow<T>>,
) {
    storeInstance.update((x) => ({ loaded: false, data: [] }));
}

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

            storeInstance.update((x) => ({
                loaded: !!data,
                data,
            }));
        }
    });
}

export function destroy<T>(
    storeInstance: Store<WithEntity<T>>,
) {
    // OK this needs a little bit of explanation
    // this looks crazy, but it is supposed to work exactly like this. We had data defined as T
    // and use the safeEmptyValue to be able to safely dereference the values in detail and not been
    // forced to write a?.b that storybook does not like
    // but in case the entity detail is not shown anymore so we want everyone that would expect that
    // to fail
    storeInstance.update((x) => ({ loaded: false, data: undefined as any }));
}

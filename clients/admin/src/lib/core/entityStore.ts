import { query, Result } from 'svelte-apollo';
import type { Store } from '../support/store';
import type { DocumentNode } from '@apollo/client/core';

export interface WithEntityRow<T> {
    loaded: boolean;
    data: T[];
}

export function ensureEntityStore<T, Q> (
    storeInstance: Store<WithEntityRow<T>>,
    gql: DocumentNode,
    convert: (result: Q) => T[]
) {
    if (storeInstance.get().loaded) return;

    const loadResult = query<Q>(gql);
    loadResult.subscribe((value) => {
        if (value?.error) throw new Error(`${value?.error}`);
        if (value?.data) {
            const data = convert(value.data);

            storeInstance.update((x) => ({
                loaded: data && data.length > 0,
                data
            }));
        }
    });
}

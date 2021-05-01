import type { WatchQueryOptions } from '@apollo/client';
import type { DocumentNode } from 'graphql';
import { getClient } from './context';
import type { ReadableQuery } from './observable';
import { Data, observableQueryToReadable } from './observable';

export function query<TData = unknown, TVariables = unknown>(
    query: DocumentNode,
    options: Omit<WatchQueryOptions<TVariables, TData>, 'query'> = {},
): ReadableQuery<TData> {
    const client = getClient();
    const queryOptions = { ...options, query } as WatchQueryOptions<TVariables, TData>;

    let initialValue: TData | undefined;

    const observable = client.watchQuery<TData, TVariables>(queryOptions);
    return observableQueryToReadable(
        observable,
        initialValue !== undefined
            ? ({
                  data: initialValue,
              } as Data<TData>)
            : undefined,
    );
}

import type { Store } from '../support/store';
import type { WithEntity, WithEntityRow } from '../core/entityStore';
import type { FetchResult } from '@apollo/client';

/**
 * Entity Detail base type
 */
export interface EntityDetail {
    id: number;
}

/**
 * Entity Row base type
 */
export type EntityRow = unknown;

/**
 * Entity save args
 */
export interface EntitySaveArgs {
    id?: number;
}

export interface ServiceStores<T extends EntityDetail, L extends EntityRow> {
    list: Store<WithEntityRow<L>>;
    detail: Store<WithEntity<T>>;
}

/**
 * Entity service
 */
export interface Service<
    T extends EntityDetail,
    L extends EntityRow,
    S extends EntitySaveArgs,
    TSaveMutation
> {
    stores: ServiceStores<T, L>;
    load(id: number): void;
    save(s: S): Promise<FetchResult<TSaveMutation>>;
}

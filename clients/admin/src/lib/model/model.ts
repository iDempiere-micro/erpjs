import type { WithEntity, WithEntityRow } from '../core/entityStore';
import type { FetchResult } from '@apollo/client';
import type { Maybe, Scalars } from '../../generated/graphql';
import type { Store } from '../support/types';

/**
 * Entity Detail base type
 */
export interface EntityDetail {
    id: number | string;
}

/**
 * Entity Detail base type with displayName
 */
export interface EntityDetailDisplayable extends EntityDetail {
    displayName: string;
}

/**
 * Entity Row base type
 */
export type EntityRow = unknown;

/**
 * Entity save args
 */
export interface EntitySaveArgs {
    id?: Maybe<Scalars['Int']> | Maybe<Scalars['String']>;
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

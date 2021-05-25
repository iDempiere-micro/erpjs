import type {
    BaseSyntheticEvent,
    ErrorType,
    IdType,
    ListItemType,
    OnSelectedIdType,
} from './types';
import type { Form } from '../absorb/svelte-forms/src/types';
import type { MessageFormatter } from 'svelte-i18n/types/runtime/types';
import type { Maybe } from '../generated/graphql';
import type { Opt } from '../lib/support/types';

export const onBlurValidate = (
    form: Form | undefined,
    id: string,
    format: MessageFormatter,
    min = 0,
): ErrorType => {
    let error: ErrorType;
    try {
        error = false;
        if (form) {
            form.validate();
            if (form.get().fields[id].errors.includes('required')) {
                error = format('validator.required');
            }
            if (form.get().fields[id].errors.includes('min')) {
                error = format('validator.minCharacters', { values: { min } });
            }
        }
        return error;
    } catch (e) {
        throw new Error(`onBlurValidate failed ${e}`);
    }
};

export const isTrue = (i: Maybe<IdType> | Opt<IdType> | ErrorType): boolean => !!i;

export function toEvent<T>(e: Event): BaseSyntheticEvent<T> {
    return (e as any) as BaseSyntheticEvent<T>;
}

export function getListItemId(i: ListItemType): string {
    if (i.id !== undefined) return i.id;
    if (i.value !== undefined) return i.value;
    if (i.to !== undefined) return i.to;
    if (i.text !== undefined) return i.text;
    return `${i}`;
}

export const isSelected = (value: OnSelectedIdType, i: ListItemType): boolean =>
    value !== undefined && `${value}` === getListItemId(i);

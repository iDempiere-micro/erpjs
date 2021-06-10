import type { Opt } from '../lib/support/types';

export interface ListItemType {
    id?: string;
    value?: string;
    to?: string;
    text?: string;
}

export interface ListItemOnChangeType {
    id?: string;
    to?: string;
}

export type IdType = string | number;
export type OnSelectedIdType = Opt<IdType>;

export type ErrorType = boolean | string;
export type DepthType = string | number;
export type CssClassesType = string | ((defaultClasses: string) => string);

export type DatePickerValueType = number | string | Date;

export interface BaseSyntheticEvent<T> {
    target: T;
}

export interface TextFieldEvent {
    value: string;
}

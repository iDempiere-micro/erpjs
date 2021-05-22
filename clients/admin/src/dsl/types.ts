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

export type ErrorType = boolean | string;

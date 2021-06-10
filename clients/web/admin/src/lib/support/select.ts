import type { IdType } from '../../dsl/types';

export interface SelectItem {
    value: IdType;
    label: string;
}

export interface OnSelectParam {
    detail: SelectItem;
}

export interface OnSelectMultiParam {
    detail: SelectItem[];
}

export interface SelectItem {
    value: string | number;
    label: string;
}

export interface OnSelectParam {
    detail: SelectItem;
}

export interface OnSelectMultiParam {
    detail: SelectItem[];
}

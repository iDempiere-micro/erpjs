export interface WithHistory {
    historyClassName: string;
}

export function instanceOfWithHistoryEntity(object: any): object is WithHistory {
    return object && object.historyClassName;
}

import 'reflect-metadata';

export interface HistoryEntity {
    originId: number;
}

export function instanceOfHistoryEntity(object: any): object is HistoryEntity {
    return object && object.originId;
}

const metadataKey = 'HistoryField';

export function HistoryField() {
    return Reflect.metadata(metadataKey, {});
}

export function isHistoryField<T>(instance: T, propertyKey: string) {
    return !!Reflect.getMetadata(metadataKey, instance, propertyKey);
}

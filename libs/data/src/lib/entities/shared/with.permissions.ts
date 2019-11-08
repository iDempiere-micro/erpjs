export interface WithPermissions {
    catObjTypeStrId: string;
}

export function instanceOfWithPermissionsEntity(object: any): object is WithPermissions {
    return object && object.catObjTypeStrId;
}

const invalidKey = '___invalid___';

export function invalidateEntity(entity: any) {
    const catObjTypeStrId = entity.catObjTypeStrId;
    const keys = Object.keys(entity);
    for (const key of keys) {
        delete entity[key];
    }
    entity[invalidKey] = invalidKey;
    entity.catObjTypeStrId = catObjTypeStrId;
}

export function isEntityInvalid(object: any): boolean {
    return object[invalidKey] === invalidKey;
}

export interface WithWorkflow {
    wfCatObjTypeStrId: string;
    wfDefName: string;
}

export function instanceOfWithWorkflowEntity(object: any): object is WithWorkflow {
    return object && object.wfCatObjTypeStrId && object.wfDefName;
}

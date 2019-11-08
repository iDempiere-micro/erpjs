
export const ClassStore: any = {

};

export class DynamicClass {
    constructor(className: string) {
        if (ClassStore[className] === undefined || ClassStore[className] === null) {
            throw new Error(`Class type of \'${className}\' is not in the class store`);
        }
        return new ClassStore[className]();
    }
}

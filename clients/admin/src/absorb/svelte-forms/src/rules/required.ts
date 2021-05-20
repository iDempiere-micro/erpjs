export function required(val: any, args: any) {
    if (val === undefined || val === null) return false;

    if (typeof val === 'string') {
        const tmp = val.replace(/\s/g, '');

        return tmp.length > 0;
    }

    return true;
}

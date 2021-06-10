export function min(val: any, args: any) {
    const minValue = parseFloat(args[0]);
    const value = isNaN(val) ? val.length : parseFloat(val);

    return value >= minValue;
}

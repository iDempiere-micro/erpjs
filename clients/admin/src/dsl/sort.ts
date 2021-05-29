export function defaultSort(data :any, col:any, asc: boolean) {
  if (!col) return data;

  if (col.sort) return col.sort(data);

  return data.sort((a: any, b: any) => {
    const valA = col.value ? col.value(a) : a[col.field];
    const valB = col.value ? col.value(b) : b[col.field];

    const first = asc ? valA : valB;
    const second = asc ? valB : valA;

    if (typeof valA === "number") {
      return first - second;
    }

    return ("" + first).localeCompare(second);
  });
}

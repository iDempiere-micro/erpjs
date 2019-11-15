import { ClrDatagridComparatorInterface } from '@clr/angular';

export class BasicDateComparator<T> implements ClrDatagridComparatorInterface<T> {
  constructor(private field: string) {}

  compare(a: T, b: T): number {
    return (new Date(a[this.field]).getTime() - (new Date(b[this.field])).getTime());
  }
}

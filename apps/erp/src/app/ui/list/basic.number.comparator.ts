import { ClrDatagridComparatorInterface } from '@clr/angular';

export class BasicNumberComparator<T> implements ClrDatagridComparatorInterface<T> {
  constructor(private field: string) {}

  compare(a: T, b: T): number {
    return (+a[this.field]) - (+b[this.field]);
  }
}

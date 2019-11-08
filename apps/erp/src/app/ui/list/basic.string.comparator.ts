import { ClrDatagridComparatorInterface } from '@clr/angular';

export class BasicStringComparator<T> implements ClrDatagridComparatorInterface<T> {
  constructor(private field: string) {}

  compare(a: T, b: T) {
    { return (''+a[this.field]).localeCompare(''+b[this.field]);  }
  }
}

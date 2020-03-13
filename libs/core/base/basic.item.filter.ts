import { ClrDatagridStringFilterInterface } from '@clr/angular';

export class BasicItemFilter <T> implements ClrDatagridStringFilterInterface<T> {
  constructor(private field: string) {}

  accepts(item: T, search: string): boolean {
    if (this.field.includes('.')) {
      // tslint:disable-next-line:no-eval
      return eval(`item.${this.field}.includes('${search}')`);
    }
    else { return item[this.field].includes(search); }
  }
}

import * as Apollo from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Input, OnInit } from '@angular/core';
import { BasicItemFilter } from './basic.item.filter';

export abstract class ItemListComponent<TM, TQ, TV, Q extends Apollo.Query<TQ, TV>>
  implements OnInit {
  @Input() public data: Array<TM>;
  public filters: any = {};

  public abstract getQuery(): Q;
  public abstract extractData(result:TQ):Array<TM>;

  protected setBasicItemFilter(fieldNames: string[]) {
    for( const fieldName of fieldNames) {
      this.filters[fieldName.replace('.', '_')] = new BasicItemFilter(fieldName);
    }
  }

  async ngOnInit() {
    if (!this.data) {
      this.data = await this.getQuery().fetch().pipe(map((result) => this.extractData(result.data))).toPromise();
    }
  }

}

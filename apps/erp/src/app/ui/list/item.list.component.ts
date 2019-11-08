import * as Apollo from 'apollo-angular';
import { map } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { BasicItemFilter } from './basic.item.filter';

export abstract class ItemListComponent<T, TQ, TV, Q extends Apollo.Query<TQ, TV>, TM>
  implements OnInit {
  public data: Array<TM>;
  public filters: any = {};

  public abstract getQuery(): Q;
  public abstract extractData(result:TQ):Array<TM>;

  protected setBasicItemFilter(fieldNames: string[]) {
    for( const fieldName of fieldNames) {
      this.filters[fieldName.replace('.', '_')] = new BasicItemFilter(fieldName);
    }
  }

  async ngOnInit() {
    this.data = await this.getQuery().fetch().pipe(map((result) => this.extractData(result.data))).toPromise();
  }

}

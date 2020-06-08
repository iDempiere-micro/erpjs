import * as Apollo from 'apollo-angular';
import { Input, OnInit, Directive } from '@angular/core';

import { BaseComponent } from './base-component';
import { BasicItemFilter } from './basic.item.filter';
import { DataLoadingService } from '@erp/core/services/data.loading.service';
import { WindowService } from '@erp/core';

@Directive()
export abstract class ItemListComponent<TM, TQ, TV, Q extends Apollo.Query<TQ, TV>>
  extends BaseComponent implements OnInit {
  @Input() public data: Array<TM>;
  public filters: any = {};
  isIOS: boolean;

  public abstract getQuery(): Q;
  public abstract extractData(result:TQ):Array<TM>;

  protected constructor(
    private dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) {
    super();
    this.isIOS = windowService.isIOS;
  }

  protected setBasicItemFilter(fieldNames: string[]) {
    for( const fieldName of fieldNames) {
      this.filters[fieldName.replace('.', '_')] = new BasicItemFilter(fieldName);
    }
  }

  /**
   * Implement this to do custom code you would do ngOnInit
   */
  async customOnInit() {}

  /**
   * Load the data. Do not override this method, use customOnInit instead.
   */
  async ngOnInit() {
    if (!this.data) {
      // NOTE: setTimeout MUST be here otherwise we get ExpressionChangedAfterItHasBeenCheckedError
      // see https://stackoverflow.com/questions/51589983/angular-loading-spinner-errorexpressionchangedafterithasbeencheckederror
      setTimeout(async () => {
        this.data = await this.dataLoadingService.loadGQL(this.getQuery(),this.extractData);
        await this.customOnInit();
      });
    }
  }

}

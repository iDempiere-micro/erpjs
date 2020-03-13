import * as Apollo from 'apollo-angular';
import { Input, OnInit } from '@angular/core';
import { BaseComponent } from './base-component';
import { ActivatedRoute } from '@angular/router';
import { DataLoadingService } from '../services/data.loading.service';
import { WindowService } from '@erp/core';

export abstract class ItemDetailComponent<TM, TQ, TV, Q extends Apollo.Query<TQ, TV>>
  extends BaseComponent implements OnInit {
  id: number;
  @Input() public data: TM;
  isIOS: boolean;

  protected constructor(
    private route: ActivatedRoute,
    private dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) {
    super();
    this.isIOS = windowService.isIOS;
  }

  public abstract getQuery(): Q;
  public abstract extractData(result:TQ):TM;

  /**
   * Implement this to do custom code you would do ngOnInit
   */
  async customOnInit() {}

  /**
   * Load the data. Do not override this method, use customOnInit instead.
   */
  async ngOnInit() {
    if (!this.data) {
      setTimeout(async () => {
        this.id = this.route.snapshot.params.id;
        this.data = await this.dataLoadingService.loadGQL(this.getQuery(), this.extractData, { id: +this.id });
        await this.customOnInit();
      });
    }
  }
}

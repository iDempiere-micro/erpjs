import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import { map } from 'rxjs/operators';

export type extractor<Q,R> = (p: Q) => R

export interface LoadingIndicatorServiceModel {
  show()
  hide()
}

@Injectable()
export class DataLoadingService {
  private _loadingIndicator: LoadingIndicatorServiceModel;

  setLoadingIndicator(loadingIndicator: LoadingIndicatorServiceModel) {
    this._loadingIndicator = loadingIndicator;
  }

  async loadGQL<Q, V, T extends Apollo.Query<Q, V>, R>(q: T, extract: extractor<Q, R>, fetchParams: any = {}): Promise<R> {
    this._loadingIndicator.show();
    try {
      return await q.fetch(fetchParams).pipe(map(({ data }) => extract(data))).toPromise();
    } finally {
      this._loadingIndicator.hide();
    }
  }
}

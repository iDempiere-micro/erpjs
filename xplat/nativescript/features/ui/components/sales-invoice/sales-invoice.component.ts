import { Component } from '@angular/core';

import { DataLoadingService, WindowService } from '@erp/core';
import { ItemDetailComponent } from '@erp/core/base/item.detail.component';
import {
  _globalServerRootUri,
  ConfirmSalesInvoiceGQL,
  SalesInvoiceByIdGQL,
  SalesInvoiceByIdQuery,
  SalesInvoiceByIdQueryVariables,
  SalesInvoiceDetailPartsFragment
} from '@erpjs/api-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { PDFView } from 'nativescript-pdf-view';
import { registerElement } from 'nativescript-angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
registerElement('PDFView', () => PDFView);

interface DownLoadMessage {
  data: string;
}

@Component({
  moduleId: module.id,
  selector: 'xpl-sales-invoice',
  templateUrl: './sales-invoice.component.html'
})
export class SalesInvoiceComponent
  extends ItemDetailComponent<SalesInvoiceDetailPartsFragment, SalesInvoiceByIdQuery, SalesInvoiceByIdQueryVariables, SalesInvoiceByIdGQL> {

  content$ = null;

  extractData(result: SalesInvoiceByIdQuery): SalesInvoiceDetailPartsFragment {
    return result.salesInvoiceById;
  }

  getQuery(): SalesInvoiceByIdGQL {
    return this.query;
  }

  constructor(
    route: ActivatedRoute,
    private query: SalesInvoiceByIdGQL,
    private router: Router,
    private confirmSalesInvoiceGQL: ConfirmSalesInvoiceGQL,
    dataLoadingService: DataLoadingService,
    windowService: WindowService,
    private http: HttpClient,
  ) {
    super(route, dataLoadingService, windowService);
  }

  async customOnInit() {
    this.content$ = this.http.get<DownLoadMessage>(`${_globalServerRootUri.uri}/api/file/sales-invoice/${this.data.id}`).pipe(
      map( ({data}) => `data:application/pdf;base64,${data}`)
    );

    console.log(`**** content loaded!`)
  }
}

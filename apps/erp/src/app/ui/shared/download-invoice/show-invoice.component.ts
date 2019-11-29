import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../../../../../auth_config.json';
import { SalesInvoiceListPartsFragment } from '@erpjs/api-interfaces';
import { map } from 'rxjs/operators';

interface DownLoadMessage {
  data: string;
}

@Component({
  selector: 'erp-show-invoice',
  template: `
    <iframe width="50%" height="600px" [src]="content$ | async | safe: 'resourceUrl'"></iframe>
  `,
  styles: []
})
export class ShowInvoiceComponent implements OnInit {
  @Input() invoice: SalesInvoiceListPartsFragment;
  content$ = null;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.content$ = this.http.get<DownLoadMessage>(`${config.api}/api/file/sales-invoice/${this.invoice.id}`).pipe(
      map( ({data}) => `data:application/pdf;base64,${data}`)
    );
  }
}

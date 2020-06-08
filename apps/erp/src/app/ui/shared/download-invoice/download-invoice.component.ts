import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as config from '../../../../../../../auth_config.json';
import { SalesInvoiceListPartsFragment } from '@erpjs/api-interfaces';
import { map } from 'rxjs/operators';

interface DownLoadMessage {
  data: string;
}

@Component({
  selector: 'erp-download-invoice',
  template: `
      <button (click)="downloadFile()" type="button" class="btn btn-icon" aria-label="home">
          <clr-icon shape="download"></clr-icon>
      </button>
      <a #realDownload style="display: none;" [href]="href$ | async | safe: 'resourceUrl'" download="invoice-{{this.invoice.documentNo}}.pdf"></a>
  `,
  styles: []
})
export class DownloadInvoiceComponent {
  @Input() invoice: SalesInvoiceListPartsFragment;
  @ViewChild('realDownload') realDownload:ElementRef;
  href$ = null;
  constructor(private http: HttpClient) {}

  downloadFile() {
    this.href$ = this.http.get<DownLoadMessage>(`${config.api}/api/file/sales-invoice/${this.invoice.id}`).pipe(
      map( x =>  {
        setTimeout( () => { this.realDownload.nativeElement.click(); }, 200 );
        return `data:application/pdf;base64,${x.data}`
      })
    );
  }
}

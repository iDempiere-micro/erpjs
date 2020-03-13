import { Component, OnInit } from '@angular/core';
import {
  BaseSaveArgs,
  ConfirmSalesInvoiceGQL,
  CustomerDetailPartsFragment,
  SalesInvoiceByIdGQL, SalesInvoiceByIdQuery, SalesInvoiceByIdQueryVariables,
  SalesInvoiceDetailPartsFragment
} from '@erpjs/api-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ItemDetailComponent } from '@erp/core/base/item.detail.component';
import { DataLoadingService, WindowService } from '@erp/core';

@Component({
  selector: 'erp-invoice',
  template: `
    <div *ngIf="data">
      <h1>{{data.documentNo}} : {{data.organization.displayName}} -

        <a [routerLink]="['/customer',data.customer.id]">{{data.customer.displayName}}</a> :
        {{data.grandTotal}} {{data.currency.displayName}} = {{data.grandTotalAccountingSchemeCurrency}}
      {{data.organization.accountingScheme.currency.displayName}}
      <erp-download-invoice [invoice]="data"></erp-download-invoice>
        <button (click)="edit()" type="button" class="btn btn-icon" aria-label="home">
          <clr-icon shape="pencil"></clr-icon>
        </button>
        <button (click)="confirmInvoiceOK = true" type="button" class="btn btn-icon" aria-label="home">
          <clr-icon shape="check"></clr-icon>
        </button>
      </h1>

      <erp-show-invoice [invoice]="data"></erp-show-invoice>

      <clr-modal [(clrModalOpen)]="confirmInvoiceOK">
        <h3 class="modal-title">Invoice Confirmation</h3>
        <div class="modal-body">
          <p>Confirm the invoice content is correct. The invoice number will be assigned when you click OK.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline" (click)="confirmInvoiceOK = false">Cancel</button>
          <button type="button" class="btn btn-primary" (click)="confirm()">OK</button>
        </div>
      </clr-modal>

    </div>
  `,
  styles: []
})
export class SalesInvoiceComponent
  extends ItemDetailComponent<SalesInvoiceDetailPartsFragment, SalesInvoiceByIdQuery, SalesInvoiceByIdQueryVariables, SalesInvoiceByIdGQL>
  implements OnInit {

  confirmInvoiceOK = false;

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
  ) {
    super(route, dataLoadingService, windowService)
  }

  async edit() {
    await this.router.navigate(['/editSalesInvoice', this.id]);
  }

  async confirm() {
    const id = this.id;
    const args: BaseSaveArgs = {id};
    await this.confirmSalesInvoiceGQL.mutate({args}).toPromise();
    this.confirmInvoiceOK = false;
    setTimeout(()=>{window.location.reload();}, 1000);
  }
}

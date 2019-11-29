import { Component, OnInit } from '@angular/core';
import {
  BaseSaveArgs,
  ConfirmSalesInvoiceGQL,
  SalesInvoiceByIdGQL,
  SalesInvoiceDetailPartsFragment
} from '@erpjs/api-interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'erp-invoice',
  template: `
    <div *ngIf="invoice">
      <h1>{{invoice.documentNo}} : {{invoice.organization.displayName}} -

        <a [routerLink]="['/customer',invoice.customer.id]">{{invoice.customer.displayName}}</a> :
        {{invoice.grandTotal}} {{invoice.currency.displayName}} = {{invoice.grandTotalAccountingSchemeCurrency}}
      {{invoice.organization.accountingScheme.currency.displayName}}
      <erp-download-invoice [invoice]="invoice"></erp-download-invoice>
        <button (click)="edit()" type="button" class="btn btn-icon" aria-label="home">
          <clr-icon shape="pencil"></clr-icon>
        </button>
        <button (click)="confirm()" type="button" class="btn btn-icon" aria-label="home">
          <clr-icon shape="check"></clr-icon>
        </button>
      </h1>

      <erp-show-invoice [invoice]="invoice"></erp-show-invoice>

    </div>
  `,
  styles: []
})
export class SalesInvoiceComponent implements OnInit {
  id: number;
  invoice: SalesInvoiceDetailPartsFragment;

  constructor(
    private route: ActivatedRoute,
    private query: SalesInvoiceByIdGQL,
    private router: Router,
    private confirmSalesInvoiceGQL: ConfirmSalesInvoiceGQL,
  ) {}

  async ngOnInit() {
    const id = +this.route.snapshot.params.id;
    this.id = id;
    this.invoice = await this.query.fetch({id})
      .pipe(map(({data}) => data.salesInvoiceById)).toPromise();
  }

  async edit() {
    await this.router.navigate(['/editSalesInvoice', this.id]);
  }
  async confirm() {
    const id = this.id;
    const args: BaseSaveArgs = {id};
    await this.confirmSalesInvoiceGQL.mutate({args}).toPromise();
    setTimeout(()=>{window.location.reload();}, 1000);
  }
}

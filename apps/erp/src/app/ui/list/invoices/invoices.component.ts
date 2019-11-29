import { Component, OnInit } from '@angular/core';
import { ItemListComponent } from '../item.list.component';
import {
  SalesInvoiceListPartsFragment,
  SalesInvoicesGQL,
  SalesInvoicesQuery,
  SalesInvoicesQueryVariables
} from '@erpjs/api-interfaces';
import { BasicStringComparator } from '../basic.string.comparator';
import { BasicNumberComparator } from '../basic.number.comparator';
import { BasicDateComparator } from '../basic.date.comparator';

@Component({
  selector: 'erp-invoices',
  template: `
      <clr-datagrid *ngIf="data">
          <clr-dg-column>ID
          </clr-dg-column>
          <clr-dg-column [clrDgSortBy]="documentNoStringComparator">DocumentNo
              <clr-dg-string-filter [clrDgStringFilter]="filters.documentNo"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column>Customer
              <clr-dg-string-filter [clrDgStringFilter]="filters.customer_legalName"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column>Total Lines
          </clr-dg-column>
          <clr-dg-column [clrDgSortBy]="dueDateComparator">Due
          </clr-dg-column>
          <clr-dg-column [clrDgSortBy]="totalLinesComparator" >Grand Total (posted)
          </clr-dg-column>
          <clr-dg-column>
          </clr-dg-column>


          <clr-dg-row *clrDgItems="let invoice of data">
            <clr-dg-cell><a [routerLink]="['/salesInvoice',invoice.id]">{{invoice.id}}</a></clr-dg-cell>
              <clr-dg-cell><a [routerLink]="['/salesInvoice',invoice.id]">{{invoice.documentNo}}</a></clr-dg-cell>
              <clr-dg-cell>{{invoice.customer.legalName}}</clr-dg-cell>
              <clr-dg-cell><a [routerLink]="['/salesInvoice',invoice.id]">{{invoice.totalLines}} {{invoice.currency.displayName}}</a></clr-dg-cell>
              <clr-dg-cell><a [routerLink]="['/salesInvoice',invoice.id]">{{invoice.dueDate | date}}</a></clr-dg-cell>
              <clr-dg-cell><a [routerLink]="['/salesInvoice',invoice.id]">{{invoice.grandTotalAccountingSchemeCurrency}}
              {{invoice.organization.accountingScheme.currency.displayName}}
              </a></clr-dg-cell>
              <clr-dg-cell><erp-download-invoice [invoice]="invoice"></erp-download-invoice></clr-dg-cell>
          </clr-dg-row>

          <clr-dg-footer>{{data.length}} sales invoices</clr-dg-footer>
      </clr-datagrid>
  `,
  styles: []
})
export class InvoicesComponent
  extends ItemListComponent<SalesInvoiceListPartsFragment, SalesInvoicesQuery, SalesInvoicesQueryVariables, SalesInvoicesGQL>
  implements OnInit {

  private documentNoStringComparator = new BasicStringComparator('documentNo');
  private totalLinesComparator = new BasicNumberComparator('totalLines');
  private dueDateComparator = new BasicDateComparator('dueDate');

  constructor(
    private salesInvoicesGQL: SalesInvoicesGQL
  ) {
    super();
  }

  extractData(result: SalesInvoicesQuery): Array<SalesInvoiceListPartsFragment> {
    return result.invoices;
  }

  getQuery(): SalesInvoicesGQL {
    return this.salesInvoicesGQL;
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    super.setBasicItemFilter(['documentNo', 'customer.legalName']);
  }
}



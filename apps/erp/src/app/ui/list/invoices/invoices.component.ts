import { Component, OnInit } from '@angular/core';
import { ItemListComponent } from '../item.list.component';
import {
  Currency,
  Customer,
  Organization,
  SalesInvoice,
  SalesInvoicesGQL,
  SalesInvoicesQuery,
  SalesInvoicesQueryVariables
} from '@erpjs/api-interfaces';
import { BasicStringComparator } from '../basic.string.comparator';
import { BasicNumberComparator } from '../basic.number.comparator';

type Item =     { __typename?: 'SalesInvoice' }
  & Pick<SalesInvoice, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'grandTotalAccountingSchemeCurrency' | 'dueDate' | 'issuedOn' | 'isDraft' | 'isCalculated' | 'documentNo' | 'grandTotal' | 'narration' | 'totalLines' | 'totalLinesAccountingSchemeCurrency' | 'currencyMultiplyingRateToAccountingSchemeCurrency' | 'transactionDate' | 'printed'>
  & { organization: (
    { __typename?: 'Organization' }
    & Pick<Organization, 'id'>
    ), currency: (
    { __typename?: 'Currency' }
    & Pick<Currency, 'id' | 'displayName' | 'isoCode'>
    ), customer: (
    { __typename?: 'Customer' }
    & Pick<Customer, 'id' | 'displayName' | 'legalName'>
    ) };

@Component({
  selector: 'erp-invoices',
  template: `
      <clr-datagrid *ngIf="data">
          <clr-dg-column>ID
          </clr-dg-column>
          <clr-dg-column [clrDgSortBy]="basicStringComparator">DocumentNo
              <clr-dg-string-filter [clrDgStringFilter]="filters.documentNo"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column>Customer
              <clr-dg-string-filter [clrDgStringFilter]="filters.customer_legalName"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column>Total Lines
          </clr-dg-column>
          <clr-dg-column>Due
          </clr-dg-column>
          <clr-dg-column [clrDgSortBy]="basicNumberComparator" >Grand Total (posted)
          </clr-dg-column>

          <clr-dg-row *clrDgItems="let invoice of data">
              <clr-dg-cell>{{invoice.id}}</clr-dg-cell>
              <clr-dg-cell>{{invoice.documentNo}}</clr-dg-cell>
              <clr-dg-cell>{{invoice.customer.legalName}}</clr-dg-cell>
              <clr-dg-cell>{{invoice.totalLines}} {{invoice.currency.displayName}}</clr-dg-cell>
              <clr-dg-cell>{{invoice.dueDate | date}}</clr-dg-cell>
              <clr-dg-cell>{{invoice.grandTotalAccountingSchemeCurrency}}</clr-dg-cell>
          </clr-dg-row>

          <clr-dg-footer>{{data.length}} invoices</clr-dg-footer>
      </clr-datagrid>
  `,
  styles: []
})
export class InvoicesComponent
  extends ItemListComponent<SalesInvoice, SalesInvoicesQuery, SalesInvoicesQueryVariables, SalesInvoicesGQL, Item>
  implements OnInit {

  private basicStringComparator = new BasicStringComparator('documentNo');
  private basicNumberComparator = new BasicNumberComparator('totalLines');

  constructor(
    private salesInvoicesGQL: SalesInvoicesGQL
  ) {
    super();
  }

  extractData(result: SalesInvoicesQuery): Array<Item> {
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



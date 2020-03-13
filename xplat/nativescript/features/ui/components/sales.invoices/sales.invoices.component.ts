import { Component, Input } from '@angular/core';

import { BaseComponent, DataLoadingService, ItemListComponent, WindowService } from '@erp/core';
import {
  SalesInvoiceListPartsFragment,
  SalesInvoicesGQL,
  SalesInvoicesQuery,
  SalesInvoicesQueryVariables
} from '@erpjs/api-interfaces';
import { ItemEventData } from 'tns-core-modules/ui/list-view';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'xpl-sales-invoices',
  templateUrl: './sales.invoices.component.html'
})
export class SalesInvoicesComponent
  extends ItemListComponent<
    SalesInvoiceListPartsFragment, SalesInvoicesQuery, SalesInvoicesQueryVariables, SalesInvoicesGQL
    > {
  @Input() showCustomer = true;


  extractData(result: SalesInvoicesQuery): Array<SalesInvoiceListPartsFragment> {
    return result.invoices;
  }

  getQuery(): SalesInvoicesGQL {
    return this.salesInvoicesGQL;
  }

  constructor(
    private salesInvoicesGQL: SalesInvoicesGQL,
    private router: Router,
    dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) {
    super(dataLoadingService, windowService);
  }

  onItemTap(args: ItemEventData) {
    console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.data[args.index]}`);
    this.router.navigate(['salesInvoice', this.data[args.index].id]);
  }
}

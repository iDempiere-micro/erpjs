import { Component } from '@angular/core';

import { CustomerListPartsFragment, CustomersGQL, CustomersQuery, CustomersQueryVariables } from '@erpjs/api-interfaces';
import { ItemEventData } from 'tns-core-modules/ui/list-view';
import { Router } from '@angular/router';
import { DataLoadingService, ItemListComponent, WindowService } from '@erp/core';

@Component({
  moduleId: module.id,
  selector: 'xpl-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent extends ItemListComponent<CustomerListPartsFragment, CustomersQuery, CustomersQueryVariables, CustomersGQL> {
  constructor(
    private customersGQL: CustomersGQL,
    private router: Router,
    dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) {
    super(dataLoadingService, windowService);
  }

  public getQuery(): CustomersGQL {
    return this.customersGQL;
  }
  public extractData(result: CustomersQuery): CustomerListPartsFragment[] {
    return result.customers;
  }

  onItemTap(args: ItemEventData) {
    console.log(`Index: ${args.index}; View: ${args.view} ; Item: ${this.data[args.index]}`);
    this.router.navigate(['customer', this.data[args.index].id]);
  }
}

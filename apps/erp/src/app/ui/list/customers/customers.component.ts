import { Component, OnInit } from '@angular/core';
import {
  CustomerListPartsFragment,
  CustomersGQL,
  CustomersQuery,
  CustomersQueryVariables
} from '@erpjs/api-interfaces';
import { ItemListComponent } from '../item.list.component';

@Component({
  selector: 'erp-customers',
  template: `
    <!-- p *ngIf="data">
      data: {{ data | json }}
    </p -->

    <clr-datagrid *ngIf="data">
    <clr-dg-column>ID
        </clr-dg-column>
        <clr-dg-column>Display Name
            <clr-dg-string-filter [clrDgStringFilter]="filters.displayName"></clr-dg-string-filter>
        </clr-dg-column>
        <clr-dg-column>Legal name
            <clr-dg-string-filter [clrDgStringFilter]="filters.legalName"></clr-dg-string-filter>
        </clr-dg-column>
        <clr-dg-column>VAT
            <clr-dg-string-filter [clrDgStringFilter]="filters.vatNumber"></clr-dg-string-filter>
        </clr-dg-column>

        <clr-dg-row *clrDgItems="let customer of data">
            <clr-dg-cell><a [routerLink]="['/customer',customer.id]">{{customer.id}}</a></clr-dg-cell>
            <clr-dg-cell><a [routerLink]="['/customer',customer.id]">{{customer.displayName}}</a></clr-dg-cell>
            <clr-dg-cell><a [routerLink]="['/customer',customer.id]">{{customer.legalName}}</a></clr-dg-cell>
            <clr-dg-cell><a [routerLink]="['/customer',customer.id]">{{customer.vatNumber}}</a></clr-dg-cell>

            <clr-dg-row-detail *clrIfExpanded>
                <div class="clr-row">
                    <erp-edit-customer [customer]="customer" ></erp-edit-customer>
                </div>
            </clr-dg-row-detail>
        </clr-dg-row>

        <clr-dg-footer>{{data.length}} customers</clr-dg-footer>
    </clr-datagrid>    
  `,
  styles: []
})
export class CustomersComponent extends ItemListComponent<CustomerListPartsFragment, CustomersQuery, CustomersQueryVariables, CustomersGQL>
implements OnInit {
  constructor(
    private customersGQL: CustomersGQL,
  ) { super(); }

  public getQuery(): CustomersGQL {
    return this.customersGQL;
  }
  public extractData(result: CustomersQuery): CustomerListPartsFragment[] {
    return result.customers;
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    super.setBasicItemFilter(['displayName', 'legalName', 'vatNumber']);
  }
}

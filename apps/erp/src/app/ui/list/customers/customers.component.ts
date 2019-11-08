import { Component, OnInit } from '@angular/core';
import {
  Address,
  Country,
  Customer,
  CustomersGQL,
  CustomersQuery,
  CustomersQueryVariables
} from '@erpjs/api-interfaces';
import { ItemListComponent } from '../item.list.component';

type Item ={ __typename?: 'Customer' }
& Pick<Customer, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'displayName' | 'legalName' | 'vatNumber' | 'invoicingEmail'>
& { legalAddress: (
    { __typename?: 'Address' }
    & Pick<Address, 'id' | 'updtTs' | 'updtOpId' | 'isActive' | 'isCurrent' | 'line1' | 'city' | 'zipCode'>
    & { country: (
        { __typename?: 'Country' }
        & Pick<Country, 'id' | 'displayName' | 'isoCode'>
      ) }
  ) };

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
            <clr-dg-cell>{{customer.id}}</clr-dg-cell>
            <clr-dg-cell>{{customer.displayName}}</clr-dg-cell>
            <clr-dg-cell>{{customer.legalName}}</clr-dg-cell>
            <clr-dg-cell>{{customer.vatNumber}}</clr-dg-cell>

            <clr-dg-row-detail *clrIfExpanded>
                <div class="clr-row">
                    <div class="clr-col-lg-6">
                        <erp-edit-customer [customer]="customer" ></erp-edit-customer>
                    </div>
                    <div class="clr-col-lg-6">
                        <span></span>
                    </div>
                </div>
            </clr-dg-row-detail>            
        </clr-dg-row>

        <clr-dg-footer>{{data.length}} customers</clr-dg-footer>
    </clr-datagrid>    
  `,
  styles: []
})
export class CustomersComponent extends ItemListComponent<Customer, CustomersQuery, CustomersQueryVariables, CustomersGQL, Item>
implements OnInit {
  constructor(
    private customersGQL: CustomersGQL,
  ) { super(); }

  public getQuery(): CustomersGQL {
    return this.customersGQL;
  }
  public extractData(result: CustomersQuery): Item[] {
    return result.customers;
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    super.setBasicItemFilter(['displayName', 'legalName', 'vatNumber']);
  }
}

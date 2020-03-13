import { Component, OnInit } from '@angular/core';
import { ItemListComponent } from '@erp/core/base/item.list.component';
import { LeadListPartsFragment, LeadsGQL, LeadsQuery, LeadsQueryVariables } from '@erpjs/api-interfaces';
import { DataLoadingService, WindowService } from '@erp/core';

@Component({
  selector: 'erp-leads',
  template: `
      <clr-datagrid *ngIf="data">
          <clr-dg-column>ID
          </clr-dg-column>
          <clr-dg-column >Display Name
              <clr-dg-string-filter [clrDgStringFilter]="filters.displayName"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column>Email
              <clr-dg-string-filter [clrDgStringFilter]="filters.email"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column>Company
              <clr-dg-string-filter [clrDgStringFilter]="filters.company"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column >Phone
              <clr-dg-string-filter [clrDgStringFilter]="filters.phone"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column >Budget
          </clr-dg-column>

          <clr-dg-row *clrDgItems="let lead of data">
              <clr-dg-cell>{{lead.id}}</clr-dg-cell>
              <clr-dg-cell>{{lead.displayName}}</clr-dg-cell>
              <clr-dg-cell><a target='_blank' href="mailto:{{lead.email}}">{{lead.email}}</a></clr-dg-cell>
              <clr-dg-cell>{{lead.company}}</clr-dg-cell>
              <clr-dg-cell><a href="tel:{{lead.phone}}">{{lead.phone}}</a></clr-dg-cell>
              <clr-dg-cell>{{lead.budget}} {{lead.currency.displayName}}</clr-dg-cell>
          </clr-dg-row>

          <clr-dg-footer>{{data.length}} leads</clr-dg-footer>
      </clr-datagrid>  `,
  styles: []
})
export class LeadsComponent
  extends ItemListComponent<LeadListPartsFragment, LeadsQuery, LeadsQueryVariables, LeadsGQL>
  implements OnInit {

  extractData(result: LeadsQuery): Array<LeadListPartsFragment> {
    return result.leads;
  }

  getQuery(): LeadsGQL {
    return this.leadsGQL;
  }

  constructor(
    private leadsGQL: LeadsGQL,
    dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) { super(dataLoadingService,windowService); }

  async customOnInit() {
    super.setBasicItemFilter(['displayName', 'email', 'company', 'phone']);
  }

}

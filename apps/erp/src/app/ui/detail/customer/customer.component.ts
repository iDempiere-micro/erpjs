import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerByIdGQL, CustomerByIdQuery, CustomerByIdQueryVariables, CustomerDetailPartsFragment } from '@erpjs/api-interfaces';
import { ItemDetailComponent } from '@erp/core/base/item.detail.component';
import { DataLoadingService, WindowService } from '@erp/core';

@Component({
  selector: 'erp-customer',
  template: `
    <div *ngIf="data">
        <h1>{{data.legalName}} - {{data.displayName}}</h1>
        <h2>{{data.legalAddress.line1}}, {{data.legalAddress.zipCode}}
            {{data.legalAddress.city}}, {{data.legalAddress.country.displayName}}
        </h2>

        <clr-accordion>
            <clr-accordion-panel>
                <clr-accordion-title>Sales Invoices</clr-accordion-title>
                <clr-accordion-content *clrIfExpanded>
                    <erp-invoices [data]="data.salesInvoices" ></erp-invoices>
                </clr-accordion-content>
            </clr-accordion-panel>

            <clr-accordion-panel>
                <clr-accordion-title>Tasks</clr-accordion-title>
                <clr-accordion-content *clrIfExpanded>
                    <erp-customer-tasks [data]="data.tasks" [customer]="data"></erp-customer-tasks>
                </clr-accordion-content>
            </clr-accordion-panel>

            <clr-accordion-panel>
                <clr-accordion-title>Calendar Activities</clr-accordion-title>
                <clr-accordion-content *clrIfExpanded>
                    <erp-calendar-activities [data]="data.calendarActivities" ></erp-calendar-activities>
                </clr-accordion-content>
            </clr-accordion-panel>
        </clr-accordion>
    </div>
  `,
  styles: []
})
export class CustomerComponent
  extends ItemDetailComponent<CustomerDetailPartsFragment, CustomerByIdQuery, CustomerByIdQueryVariables, CustomerByIdGQL> {

  extractData(result: CustomerByIdQuery): CustomerDetailPartsFragment {
    return result.customerById;
  }

  getQuery(): CustomerByIdGQL { return this.query; }

  constructor(
    route: ActivatedRoute,
    private query: CustomerByIdGQL,
    dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) {super(route, dataLoadingService, windowService);}

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerByIdGQL, CustomerDetailPartsFragment } from '@erpjs/api-interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'erp-customer',
  template: `
    <div *ngIf="customer">
        <h1>{{customer.legalName}} - {{customer.displayName}}</h1>
        <h2>{{customer.legalAddress.line1}}, {{customer.legalAddress.zipCode}}
            {{customer.legalAddress.city}}, {{customer.legalAddress.country.displayName}}
        </h2>

        <clr-accordion>
            <clr-accordion-panel>
                <clr-accordion-title>Sales Invoices</clr-accordion-title>
                <clr-accordion-content *clrIfExpanded>
                    <erp-invoices [data]="customer.salesInvoices" ></erp-invoices>
                </clr-accordion-content>
            </clr-accordion-panel>

            <clr-accordion-panel>
                <clr-accordion-title>Tasks</clr-accordion-title>
                <clr-accordion-content *clrIfExpanded>
                    <erp-customer-tasks [data]="customer.tasks" [customer]="customer"></erp-customer-tasks>
                </clr-accordion-content>
            </clr-accordion-panel>

            <clr-accordion-panel>
                <clr-accordion-title>Calendar Activities</clr-accordion-title>
                <clr-accordion-content *clrIfExpanded>
                    <erp-calendar-activities [data]="customer.calendarActivities" ></erp-calendar-activities>
                </clr-accordion-content>
            </clr-accordion-panel>
        </clr-accordion>        
    </div>
  `,
  styles: []
})
export class CustomerComponent implements OnInit {
  id: number;
  customer: CustomerDetailPartsFragment;

  constructor(
    private route: ActivatedRoute,
    private query: CustomerByIdGQL,
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.customer = await this.query.fetch({id: +this.id})
      .pipe(map((result) => result.data.customerById)).toPromise();
  }

}

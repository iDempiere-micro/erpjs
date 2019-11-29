import { Component, Input } from '@angular/core';
import { TasksComponent } from './tasks.component';
import { CustomerListPartsFragment } from '@erpjs/api-interfaces';

@Component({
  selector: 'erp-customer-tasks',
  template: `
      <clr-tabs>
          <clr-tab>
              <button clrTabLink id="link1">List</button>
              <clr-tab-content id="listContent" *clrIfActive="true">
                  <clr-datagrid *ngIf="data">
                      <clr-dg-column>ID
                      </clr-dg-column>
                      <clr-dg-column>Display Name
                          <clr-dg-string-filter [clrDgStringFilter]="filters.displayName"></clr-dg-string-filter>
                      </clr-dg-column>
                      <clr-dg-column [clrDgSortBy]="dueDateComparator">Due
                      </clr-dg-column>
                      <clr-dg-column>Owner
                          <clr-dg-string-filter [clrDgStringFilter]="filters.owner_email"></clr-dg-string-filter>
                      </clr-dg-column>


                      <clr-dg-row *clrDgItems="let task of data">
                          <clr-dg-cell><a [routerLink]="['/calendarActivity',task.id]">{{task.id}}</a></clr-dg-cell>
                          <clr-dg-cell>{{task.displayName}}</clr-dg-cell>
                          <clr-dg-cell>{{task.dueDate | date}}</clr-dg-cell>
                          <clr-dg-cell>{{task.owner.email}}</clr-dg-cell>
                      </clr-dg-row>

                      <clr-dg-footer>{{data.length}} tasks</clr-dg-footer>
                  </clr-datagrid>
              </clr-tab-content>
          </clr-tab>
          <clr-tab>
              <button clrTabLink>Create a new task</button>
              <clr-tab-content *clrIfActive>
                  <erp-edit-customer-task [customer]="customer" (selectedTaskChanged)="selectedTaskChanged($event)"></erp-edit-customer-task>
              </clr-tab-content>
          </clr-tab>
      </clr-tabs>
  `,
  styles: []
})
export class CustomerTasksComponent extends TasksComponent {
  @Input() customer: CustomerListPartsFragment;
}

import { Component, Input, OnInit } from '@angular/core';
import { ItemListComponent } from '../item.list.component';
import {
  CustomerListPartsFragment,
  TaskListPartsFragment,
  TasksGQL,
  TasksQuery,
  TasksQueryVariables
} from '@erpjs/api-interfaces';
import { BasicDateComparator } from '../basic.date.comparator';

@Component({
  selector: 'erp-tasks',
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
                      <clr-dg-column>Customer
                          <clr-dg-string-filter [clrDgStringFilter]="filters.customer_displayName"></clr-dg-string-filter>
                      </clr-dg-column>


                      <clr-dg-row *clrDgItems="let task of data">
                          <clr-dg-cell><a [routerLink]="['/calendarActivity',task.id]">{{task.id}}</a></clr-dg-cell>
                          <clr-dg-cell>{{task.displayName}}</clr-dg-cell>
                          <clr-dg-cell>{{task.dueDate | date}}</clr-dg-cell>
                          <clr-dg-cell>{{task.owner.email}}</clr-dg-cell>
                          <clr-dg-cell>{{task.customer.displayName}}</clr-dg-cell>
                      </clr-dg-row>

                      <clr-dg-footer>{{data.length}} tasks</clr-dg-footer>
                  </clr-datagrid>
              </clr-tab-content>
          </clr-tab>
          <clr-tab>
              <button clrTabLink>Create a new task</button>
              <clr-tab-content *clrIfActive>
                  <erp-task [customer]="customer" (selectedTaskChanged)="selectedTaskChanged($event)"></erp-task>
              </clr-tab-content>
          </clr-tab>
      </clr-tabs>
  `,
  styles: []
})
export class TasksComponent
  extends ItemListComponent<TaskListPartsFragment, TasksQuery,
    TasksQueryVariables, TasksGQL>
  implements OnInit {
  @Input() customer: CustomerListPartsFragment;

  private dueDateComparator = new BasicDateComparator('dueDate');

  extractData(result: TasksQuery): Array<TaskListPartsFragment> {
    return result.tasks;
  }

  selectedTaskChanged(task: TaskListPartsFragment) {
    const other = this.data.filter( x => x.id !== task.id );
    other.push(task);
    this.data = other;
  }

  getQuery(): TasksGQL {
    return this.tasksGQL;
  }

  constructor(
    private tasksGQL : TasksGQL,
  ) { super(); }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    super.setBasicItemFilter(['displayName', 'owner.email', 'customer.displayName']);
  }
}

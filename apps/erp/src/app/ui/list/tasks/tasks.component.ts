import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemListComponent } from '@erp/core/base/item.list.component';
import { TaskListPartsFragment, TasksGQL, TasksQuery, TasksQueryVariables } from '@erpjs/api-interfaces';
import { BasicDateComparator } from '../basic.date.comparator';
import { ClrTabs } from '@clr/angular';
import { DataLoadingService, WindowService } from '@erp/core';

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
                      <clr-dg-column>Prospect
                          <clr-dg-string-filter [clrDgStringFilter]="filters.prospect_displayName"></clr-dg-string-filter>
                      </clr-dg-column>


                      <clr-dg-row *clrDgItems="let task of data">
                          <clr-dg-cell><a [routerLink]="['/task',task.id]">{{task.id}}</a></clr-dg-cell>
                          <clr-dg-cell>{{task.displayName}}</clr-dg-cell>
                          <clr-dg-cell>{{task.dueDate | date}}</clr-dg-cell>
                          <clr-dg-cell>{{task.owner.email}}</clr-dg-cell>
                          <clr-dg-cell><a [routerLink]="['/customer',task.customer ? task.customer.id : null]">
                              {{task.customer ? task.customer.displayName : ''}}</a>
                          </clr-dg-cell>
                          <clr-dg-cell><a [routerLink]="['/prospect',task.prospect ? task.prospect.id : null]">
                              {{task.prospect ? task.prospect.displayName : ''}}</a>
                          </clr-dg-cell>
                      </clr-dg-row>

                      <clr-dg-footer>{{data.length}} tasks</clr-dg-footer>
                  </clr-datagrid>
              </clr-tab-content>
          </clr-tab>
          <clr-tab>
              <button clrTabLink>Create a new task</button>
              <clr-tab-content *clrIfActive>
                  <erp-edit-task (selectedTaskChanged)="selectedTaskChanged($event)"></erp-edit-task>
              </clr-tab-content>
          </clr-tab>
      </clr-tabs>
  `,
  styles: []
})
export class TasksComponent
  extends ItemListComponent<TaskListPartsFragment, TasksQuery,
    TasksQueryVariables, TasksGQL> {
  @ViewChild(ClrTabs) private readonly tabs: ClrTabs;

  private dueDateComparator = new BasicDateComparator('dueDate');

  extractData(result: TasksQuery): Array<TaskListPartsFragment> {
    return result.tasks;
  }

  selectedTaskChanged(task: TaskListPartsFragment) {
    const other = this.data.filter( x => x.id !== task.id );
    other.push(task);
    this.data = other;
    // see https://github.com/vmware/clarity/issues/2112
    window.setTimeout(() => { this.tabs.tabLinkDirectives[0].activate(); }, 0); // delay so Angular doesn't complain
  }

  getQuery(): TasksGQL {
    return this.tasksGQL;
  }

  constructor(
    private tasksGQL : TasksGQL,
    dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) { super(dataLoadingService, windowService); }

  async customOnInit() {
    super.setBasicItemFilter(['displayName', 'owner.email', 'customer.displayName', 'prospect.displayName']);
  }
}

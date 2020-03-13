import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import { ItemListComponent } from '@erp/core/base/item.list.component';
import { TaskListPartsFragment, TasksGQL, TasksQuery, TasksQueryVariables } from '@erpjs/api-interfaces';
import { DataLoadingService, WindowService } from '@erp/core';

@Component({
  selector: 'erp-gantt',
  template: `
      <ng-gantt [options]="editorOptions" [data]="convertedData"></ng-gantt>
  `,
  styles: []
})
export class GanttComponent extends ItemListComponent<TaskListPartsFragment, TasksQuery,
  TasksQueryVariables, TasksGQL> {
  public editorOptions: GanttEditorOptions;
  public convertedData: any;
  @ViewChild(GanttEditorComponent, { static: true }) editor: GanttEditorComponent;

  extractData(result: TasksQuery): Array<TaskListPartsFragment> {
    return result.tasks;
  }
  getQuery(): TasksGQL {
    return this.tasksGQL;
  }

  async customOnInit() {
    this.convertedData =
      this.data.map(x => (
        {
          pID : x.id,
          pName : x.displayName,
          pStart : '',
          pEnd : x.dueDate,
          pClass : 'ggroupblack',
          pLink : '',
          pMile : 0,
          pRes : x.owner.email,
          pComp : 0,
          pGroup : 1,
          pParent : 0,
          pOpen : 1,
          pDepend : '',
          pCaption : '',
          pNotes : '',
        }
      ));
  }

  constructor(
    private tasksGQL : TasksGQL,
    dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) {
    super(dataLoadingService,windowService);
    this.editorOptions = new GanttEditorOptions();
  }
}

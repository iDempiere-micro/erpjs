import { Component, OnInit, ViewChild } from '@angular/core';
import { GanttEditorComponent, GanttEditorOptions } from 'ng-gantt';
import { ItemListComponent } from '../list/item.list.component';
import { TaskListPartsFragment, TasksGQL, TasksQuery, TasksQueryVariables } from '@erpjs/api-interfaces';

@Component({
  selector: 'erp-gantt',
  template: `
      <ng-gantt [options]="editorOptions" [data]="convertedData"></ng-gantt>
  `,
  styles: []
})
export class GanttComponent extends ItemListComponent<TaskListPartsFragment, TasksQuery,
  TasksQueryVariables, TasksGQL>
implements OnInit  {
  public editorOptions: GanttEditorOptions;
  public convertedData: any;
  @ViewChild(GanttEditorComponent, { static: true }) editor: GanttEditorComponent;

  extractData(result: TasksQuery): Array<TaskListPartsFragment> {
    return result.tasks;
  }
  getQuery(): TasksGQL {
    return this.tasksGQL;
  }


  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
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
  ) {
    super();
    this.editorOptions = new GanttEditorOptions();
  }
}

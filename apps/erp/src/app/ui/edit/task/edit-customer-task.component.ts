import { Component, Input } from '@angular/core';
import { EditTaskComponent } from './edit.task.component';
import { CustomerListPartsFragment, TaskSaveArgs } from '@erpjs/api-interfaces';

@Component({
  selector: 'erp-edit-customer-task',
  template: `
      <form clrForm [formGroup]="editForm" (ngSubmit)="onSubmit()" (reset)="onReset()">
          <clr-input-container>
              <label>Display name</label>
              <input clrInput type="text" formControlName="displayName"/>
              <clr-control-helper>Any header you want the task to be called</clr-control-helper>
              <clr-control-error>You have to give a task a name.</clr-control-error>
          </clr-input-container>
          <clr-date-container>
              <label>Due date</label>
              <input type="date" clrDate name="dueDate" formControlName="dueDate">
              <clr-control-helper>The task due date.</clr-control-helper>
              <clr-control-error>You have to say when the task is due.</clr-control-error>
          </clr-date-container>
          <erp-users-select label="Owner" (selectedUserChanged)="onOwnerChanged($event)"></erp-users-select>
          <erp-users-select label="Responsible" (selectedUserChanged)="onResponsibleChanged($event)"></erp-users-select>
          <button type="submit" class="btn btn-primary">Save</button>
      </form>
  `,
  styles: []
})
export class EditCustomerTaskComponent extends EditTaskComponent {
  @Input() customer: CustomerListPartsFragment;

  getSaveArgs(formValues: any): TaskSaveArgs {
    const result = super.getSaveArgs(formValues);
    result.customerId = this.customer.id;
    return result;
  }
}

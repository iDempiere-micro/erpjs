import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskGQL, TaskListPartsFragment, TaskSaveArgs, UserListPartsFragment } from '@erpjs/api-interfaces';

@Component({
  selector: 'erp-edit-task',
  template: `
      <form clrForm [formGroup]="editForm" (ngSubmit)="onSubmit()" (reset)="onReset()">
          <clr-input-container>
              <label>Display name</label>
              <input clrInput type="text" formControlName="displayName" />
              <clr-control-helper>Any header you want the task to be called</clr-control-helper>
              <clr-control-error>You have to give a task a name. </clr-control-error>
          </clr-input-container>
          <clr-date-container>
              <label>Due date</label>
                  <input type="date" clrDate name="dueDate" formControlName="dueDate">               
              <clr-control-helper>The task due date.</clr-control-helper>
              <clr-control-error>You have to say when the task is due.</clr-control-error>
          </clr-date-container>
          <erp-users-select label="Owner" (selectedUserChanged)="onOwnerChanged($event)" ></erp-users-select>
          <erp-users-select label="Responsible" (selectedUserChanged)="onResponsibleChanged($event)"></erp-users-select>
          <button type="submit" class="btn btn-primary">Save</button>
      </form>  
  `,
  styles: []
})
export class EditTaskComponent implements OnInit {
  @Input() task: TaskListPartsFragment;
  @Output()  selectedTaskChanged = new EventEmitter<TaskListPartsFragment>();

  editForm: FormGroup;
  submitted = false;
  owner: UserListPartsFragment;
  responsible: UserListPartsFragment;

  constructor(
    private formBuilder: FormBuilder,
    private taskGQL: TaskGQL,
  ) { }

  onOwnerChanged(user:UserListPartsFragment) {
    this.owner = user
  }
  onResponsibleChanged(user:UserListPartsFragment) {
    this.responsible = user
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      displayName: [this.task ? this.task.displayName : '', Validators.required],
      dueDate: [this.task ? this.task.dueDate : '', Validators.required],
    }, );
  }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  getSaveArgs(formValues: any): TaskSaveArgs {
    return {
      dueDate: formValues.dueDate,
      displayName: formValues.displayName,
      ownerId: this.owner.id,
      responsibleId: this.responsible.id,
    };
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    const args = this.getSaveArgs(this.editForm.value);
    const result = await this.taskGQL.mutate(
      {
        args,
      }).toPromise();
    this.selectedTaskChanged.emit(result.data.task);
  }

  onReset() {
    this.submitted = false;
    this.editForm.reset();
  }
}

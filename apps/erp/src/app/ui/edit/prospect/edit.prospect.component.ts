import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProspectGQL, ProspectListPartsFragment, UserListPartsFragment } from '@erpjs/api-interfaces';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'erp-edit-prospect',
  template: `
      <form clrForm [formGroup]="editForm" (ngSubmit)="onSubmit()" (reset)="onReset()">
          <clr-input-container>
              <label >Display name</label>
              <input  clrInput type="text" formControlName="displayName"/>
              <clr-control-helper>Any header you want the prospect to be called</clr-control-helper>
              <clr-control-error>You have to give a prospect a name. </clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label >Action taken</label>
              <input  clrInput type="text" name="actionTaken" formControlName="actionTaken">
              <clr-control-helper>The action prospect took.</clr-control-helper>
              <clr-control-error>You have to say what action the prospect took.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label >Problem</label>
              <input  clrInput type="text" name="problem" formControlName="problem">
              <clr-control-helper>The problem prospect is trying to solve.</clr-control-helper>
              <clr-control-error>You have to say what problem the prospect is trying to solve.</clr-control-error>
          </clr-input-container>
          <clr-input-container>
              <label >Url</label>
              <input  clrInput type="text" name="url" formControlName="url">
              <clr-control-helper>The URL to prospect.</clr-control-helper>
              <clr-control-error>You have to say where to find the prospect.</clr-control-error>
          </clr-input-container>
          <button type="submit" class="btn btn-primary">Save</button>
      </form> 
  `,
  styles: []
})
export class EditProspectComponent implements OnInit {
  @Input() prospect: ProspectListPartsFragment;
  @Output() selectedProspectChanged = new EventEmitter<ProspectListPartsFragment>();

  editForm: FormGroup;
  submitted = false;
  owner: UserListPartsFragment;
  responsible: UserListPartsFragment;

  constructor(
    private formBuilder: FormBuilder,
    private prospectGQL: ProspectGQL,
  ) {
  }

  onOwnerChanged(user: UserListPartsFragment) {
    this.owner = user
  }

  onResponsibleChanged(user: UserListPartsFragment) {
    this.responsible = user
  }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      displayName: [this.prospect ? this.prospect.displayName : '', Validators.required],
      actionTaken: [this.prospect ? this.prospect.actionTaken : '', Validators.required],
      problem: [this.prospect ? this.prospect.problem : '', Validators.required],
      url: [this.prospect ? this.prospect.url : '', Validators.required],
    },);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.editForm.controls;
  }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editForm.invalid) {
      return;
    }

    const result = await this.prospectGQL.mutate(
      {
        args: {
          id: this.prospect ? this.prospect.id : null,
          displayName: this.editForm.value.displayName,
          actionTaken: this.editForm.value.actionTaken,
          problem: this.editForm.value.problem,
          url: this.editForm.value.url,
          originatedSuspectId: null,
        }
      }).toPromise();
    this.selectedProspectChanged.emit(result.data.prospect);
  }

  onReset() {
    this.submitted = false;
    this.editForm.reset();
  }
}

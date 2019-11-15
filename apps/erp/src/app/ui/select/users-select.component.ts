import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersComponent } from '../list/users/users.component';
import { UserListPartsFragment } from '@erpjs/api-interfaces';

@Component({
  selector: 'erp-users-select',
  template: `
    <clr-select-container>
        <label>{{label}}</label>
        <select clrSelect name="responsible" [(ngModel)]="selectedUserId" (change)="changed()">
            <option *ngFor="let user of data" [value]="user.id">{{user.email}}</option>
        </select>
        <clr-control-helper>Who should fulfill the task.</clr-control-helper>
        <clr-control-error>Each task needs to be done by someone.</clr-control-error>
    </clr-select-container>
  `,
  styles: []
})
export class UsersSelectComponent extends UsersComponent implements OnInit {
  @Input() label: string;
  @Output() selectedUserChanged = new EventEmitter<UserListPartsFragment>();
  selectedUserId: number;
  changed() {
    const user = this.data.find(x => +x.id === +this.selectedUserId);
    this.selectedUserChanged.emit(user);
  }
}

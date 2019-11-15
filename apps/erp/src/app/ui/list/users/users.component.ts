import { Component, OnInit } from '@angular/core';
import { ItemListComponent } from '../item.list.component';
import { UserListPartsFragment, UsersGQL, UsersQuery, UsersQueryVariables } from '@erpjs/api-interfaces';

@Component({
  selector: 'erp-users',
  template: `
      <clr-datagrid *ngIf="data">
          <clr-dg-column>ID
          </clr-dg-column>
          <clr-dg-column>Display Name
              <clr-dg-string-filter [clrDgStringFilter]="filters.name"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column>Email
              <clr-dg-string-filter [clrDgStringFilter]="filters.email"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column>User name
              <clr-dg-string-filter [clrDgStringFilter]="filters.username"></clr-dg-string-filter>
          </clr-dg-column>

          <clr-dg-row *clrDgItems="let user of data">
              <clr-dg-cell><a [routerLink]="['/user',user.id]">{{user.id}}</a></clr-dg-cell>
              <clr-dg-cell>{{user.name}}</clr-dg-cell>
              <clr-dg-cell>{{user.email}}</clr-dg-cell>
              <clr-dg-cell>{{user.username}}</clr-dg-cell>
          </clr-dg-row>

          <clr-dg-footer>{{data.length}} users</clr-dg-footer>
      </clr-datagrid>      `,
  styles: []
})
export class UsersComponent extends ItemListComponent<UserListPartsFragment, UsersQuery, UsersQueryVariables, UsersGQL>
  implements OnInit {

  extractData(result: UsersQuery): Array<UserListPartsFragment> {
    return result.users;
  }

  getQuery(): UsersGQL {
    return this.usersGQL;
  }

  constructor(
    private usersGQL: UsersGQL,
  ) { super(); }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    super.setBasicItemFilter(['email', 'username', 'name']);
  }

}

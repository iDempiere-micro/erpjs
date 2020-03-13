import { Component, OnInit } from '@angular/core';
import { ItemListComponent } from '@erp/core/base/item.list.component';
import { UserListPartsFragment, UsersGQL, UsersQuery, UsersQueryVariables } from '@erpjs/api-interfaces';
import { DataLoadingService, WindowService } from '@erp/core';

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
export class UsersComponent
  extends ItemListComponent<UserListPartsFragment, UsersQuery, UsersQueryVariables, UsersGQL> {

  extractData(result: UsersQuery): Array<UserListPartsFragment> {
    return result.users;
  }

  getQuery(): UsersGQL {
    return this.usersGQL;
  }

  constructor(
    private usersGQL: UsersGQL,
    dataLoadingService: DataLoadingService,
    windowService: WindowService,
  ) { super(dataLoadingService, windowService); }

  async customOnInit() {
    super.setBasicItemFilter(['email', 'username', 'name']);
  }
}

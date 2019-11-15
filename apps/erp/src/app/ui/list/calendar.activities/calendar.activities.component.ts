import { Component, OnInit } from '@angular/core';
import { ItemListComponent } from '../item.list.component';
import {
  CalendarActivitiesGQL,
  CalendarActivitiesQuery,
  CalendarActivitiesQueryVariables,
  CalendarActivityListPartsFragment
} from '@erpjs/api-interfaces';
import { BasicDateComparator } from '../basic.date.comparator';

@Component({
  selector: 'erp-calendar-activities',
  template: `
      <clr-datagrid *ngIf="data">
          <clr-dg-column>ID
          </clr-dg-column>
          <clr-dg-column>Display Name
              <clr-dg-string-filter [clrDgStringFilter]="filters.displayName"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column [clrDgSortBy]="startComparator">Start
          </clr-dg-column>
          <clr-dg-column [clrDgSortBy]="endComparator">End
          </clr-dg-column>
          <clr-dg-column>Owner
              <clr-dg-string-filter [clrDgStringFilter]="filters.owner_email"></clr-dg-string-filter>
          </clr-dg-column>
          <clr-dg-column>Customer
              <clr-dg-string-filter [clrDgStringFilter]="filters.customer_displayName"></clr-dg-string-filter>
          </clr-dg-column>

          <clr-dg-row *clrDgItems="let calendarActivity of data">
              <clr-dg-cell><a [routerLink]="['/calendarActivity',calendarActivity.id]">{{calendarActivity.id}}</a></clr-dg-cell>
              <clr-dg-cell><a [routerLink]="['/calendarActivity',calendarActivity.id]">{{calendarActivity.displayName}}</a></clr-dg-cell>
              <clr-dg-cell>{{calendarActivity.start | date : 'short'}}</clr-dg-cell>
              <clr-dg-cell>{{calendarActivity.end | date : 'short'}}</clr-dg-cell>
              <clr-dg-cell>{{calendarActivity.owner.email}}</clr-dg-cell>
              <clr-dg-cell><a [routerLink]="['/customer',calendarActivity.customer.id]">{{calendarActivity.customer.displayName}}</a></clr-dg-cell>
          </clr-dg-row>

          <clr-dg-footer>{{data.length}} calendar activities</clr-dg-footer>
      </clr-datagrid>
  `,
  styles: []
})
export class CalendarActivitiesComponent
  extends ItemListComponent<CalendarActivityListPartsFragment, CalendarActivitiesQuery,
    CalendarActivitiesQueryVariables, CalendarActivitiesGQL>
  implements OnInit {
  private startComparator = new BasicDateComparator('start');
  private endComparator = new BasicDateComparator('end');

  extractData(result: CalendarActivitiesQuery): Array<CalendarActivityListPartsFragment> {
    return result.calendarActivities;
  }

  getQuery(): CalendarActivitiesGQL {
    return this.calendarActivitiesGQL;
  }

  constructor(
    private calendarActivitiesGQL: CalendarActivitiesGQL,
  ) { super(); }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    super.setBasicItemFilter(['displayName', 'owner.email', 'customer.displayName']);
  }

}

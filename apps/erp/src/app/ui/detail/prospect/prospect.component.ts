import { Component, OnInit } from '@angular/core';
import { ProspectByIdGQL, ProspectDetailPartsFragment } from '@erpjs/api-interfaces';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'erp-prospect',
  template: `
      <div *ngIf="prospect">
          <h1>{{prospect.displayName}}</h1>
          <h2>{{prospect.problem}}</h2>
          <h3>{{prospect.actionTaken}}</h3>
          <h4><a href="{{prospect.url}}" target="_blank" >{{prospect.url}}</a></h4>

          <clr-accordion>
              <clr-accordion-panel>
                  <clr-accordion-title>Tasks</clr-accordion-title>
                  <clr-accordion-content *clrIfExpanded>
                      <erp-prospect-tasks [data]="prospect.tasks" [prospect]="prospect"></erp-prospect-tasks>
                  </clr-accordion-content>
              </clr-accordion-panel>

              <clr-accordion-panel>
                  <clr-accordion-title>Calendar Activities</clr-accordion-title>
                  <clr-accordion-content *clrIfExpanded>
                      <erp-calendar-activities [data]="prospect.calendarActivities" ></erp-calendar-activities>
                  </clr-accordion-content>
              </clr-accordion-panel>
          </clr-accordion>
      </div>  `,
  styles: []
})
export class ProspectComponent implements OnInit {
  id: number;
  prospect: ProspectDetailPartsFragment;

  constructor(
    private route: ActivatedRoute,
    private query: ProspectByIdGQL,
  ) {}

  async ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.prospect = await this.query.fetch({id: +this.id})
      .pipe(map((result) => result.data.prospectById)).toPromise();
  }

}

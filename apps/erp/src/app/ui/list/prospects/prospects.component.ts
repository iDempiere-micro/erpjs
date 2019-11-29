import { Component, OnInit, ViewChild } from '@angular/core';
import { ItemListComponent } from '../item.list.component';
import {
  ProspectListPartsFragment,
  ProspectsGQL,
  ProspectsQuery,
  ProspectsQueryVariables
} from '@erpjs/api-interfaces';
import { ClrTabs } from '@clr/angular';

@Component({
  selector: 'erp-prospects',
  template: `
      <clr-tabs>
          <clr-tab>
              <button clrTabLink id="link1">List</button>
              <clr-tab-content id="listContent" *clrIfActive="true">
                  <clr-datagrid *ngIf="data">
                      <clr-dg-column>ID
                      </clr-dg-column>
                      <clr-dg-column>Display Name
                          <clr-dg-string-filter [clrDgStringFilter]="filters.displayName"></clr-dg-string-filter>
                      </clr-dg-column>
                      <clr-dg-column>URL
                          <clr-dg-string-filter [clrDgStringFilter]="filters.url"></clr-dg-string-filter>
                      </clr-dg-column>
                      <clr-dg-column>Problem
                          <clr-dg-string-filter [clrDgStringFilter]="filters.problem"></clr-dg-string-filter>
                      </clr-dg-column>
                      <clr-dg-column>Action Taken
                          <clr-dg-string-filter [clrDgStringFilter]="filters.actionTaken"></clr-dg-string-filter>
                      </clr-dg-column>

                      <clr-dg-row *clrDgItems="let prospect of data">
                          <clr-dg-cell><a [routerLink]="['/prospect',prospect.id]">{{prospect.id}}</a></clr-dg-cell>
                          <clr-dg-cell><a [routerLink]="['/prospect',prospect.id]">{{prospect.displayName}}</a></clr-dg-cell>
                          <clr-dg-cell><a target='_blank' href="{{prospect.url}}">{{prospect.url}}</a></clr-dg-cell>
                          <clr-dg-cell><a [routerLink]="['/prospect',prospect.id]">{{prospect.problem}}</a></clr-dg-cell>
                          <clr-dg-cell><a [routerLink]="['/prospect',prospect.id]">{{prospect.actionTaken}}</a></clr-dg-cell>

                          <clr-dg-row-detail *clrIfExpanded>
                              <div class="clr-row">
                                  <div class="clr-col-lg-8">
                                      <erp-edit-prospect [prospect]="prospect"
                                                    (selectedProspectChanged)="selectedProspectChanged($event)"></erp-edit-prospect>
                                  </div>
                                  <div class="clr-col-lg-4">
                                      
                                  </div>
                              </div>
                          </clr-dg-row-detail>

                      </clr-dg-row>

                      <clr-dg-footer>{{data.length}} prospects</clr-dg-footer>
                  </clr-datagrid>
              </clr-tab-content>
          </clr-tab>
          <clr-tab>
              <button clrTabLink>Create a new prospect</button>
              <clr-tab-content *clrIfActive>
                  <erp-prospect (selectedProspectChanged)="selectedProspectChanged($event)"></erp-prospect>
              </clr-tab-content>
          </clr-tab>
      </clr-tabs>

  `,
  styles: []
})
export class ProspectsComponent
  extends ItemListComponent<ProspectListPartsFragment, ProspectsQuery, ProspectsQueryVariables, ProspectsGQL>
  implements OnInit {
  @ViewChild(ClrTabs, {static: false}) private readonly tabs: ClrTabs;

  constructor(
    private prospectsGQL: ProspectsGQL,
  ) {
    super();
  }


  extractData(result: ProspectsQuery): Array<ProspectListPartsFragment> {
    return result.prospects;
  }

  getQuery(): ProspectsGQL {
    return this.prospectsGQL;
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();
    super.setBasicItemFilter(['displayName', 'url', 'problem', 'actionTaken']);
  }

  selectedProspectChanged(prospect: ProspectListPartsFragment) {
    const other = this.data.filter( x => x.id !== prospect.id );
    other.push(prospect);
    this.data = other;
    // see https://github.com/vmware/clarity/issues/2112
    window.setTimeout(() => { this.tabs.tabLinkDirectives[0].activate(); }, 0); // delay so Angular doesn't complain
  }

}

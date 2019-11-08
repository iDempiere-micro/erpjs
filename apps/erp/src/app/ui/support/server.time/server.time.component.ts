import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from 'apollo-client';
import { GetServerTimeGQL, GetServerTimeQuery } from '@erpjs/api-interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'erp-server.time',
  template: `
      <div>Server time: {{serverNow | async | date }}</div>
  `,
  styles: []
})
export class ServerTimeComponent implements OnInit {
  public serverNow: Observable<ApolloQueryResult<GetServerTimeQuery>>;

  constructor(
    private getServerTimeGQL: GetServerTimeGQL,
  ) { }

  async ngOnInit() {
    this.serverNow = this.getServerTimeGQL.watch().valueChanges.pipe(map(({data}) => data.now));
  }
}

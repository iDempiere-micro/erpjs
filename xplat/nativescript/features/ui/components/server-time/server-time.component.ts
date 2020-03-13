import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '@erp/core';
import { map } from 'rxjs/operators';
import { GetServerTimeGQL } from '@erpjs/api-interfaces';

@Component({
  moduleId: module.id,
  selector: 'xpl-server-time',
  templateUrl: './server-time.component.html'
})
export class ServerTimeComponent extends BaseComponent implements OnInit {
  public serverNow: Date;

  constructor(private getServerTimeGQL: GetServerTimeGQL,) {
    super();
  }

  async ngOnInit() {
    this.serverNow =
      await this.getServerTimeGQL.fetch().pipe(map(({data}) => data.now)).toPromise();

    console.log('**** serverNow', this.serverNow);
  }
}

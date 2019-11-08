import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-main',
  template: `
      <div class="content-container">
          <div class="content-area">
              <ng-content></ng-content>
          </div>
          <erp-sidebar class="sidenav"></erp-sidebar>
      </div>
  `,
  styles: []
})
export class MainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-layout',
  template: `
      <div class="main-container">
          <erp-header></erp-header>
          <erp-main>
              <ng-content></ng-content>
          </erp-main>
      </div>
  `,
  styles: []
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

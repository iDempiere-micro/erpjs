import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-homepage',
  template: `
    <div>
        <erp-development-token></erp-development-token>
    </div>
  `,
  styles: []
})
export class HomepageComponent implements OnInit {
  constructor() { }

  async ngOnInit() {

  }

}

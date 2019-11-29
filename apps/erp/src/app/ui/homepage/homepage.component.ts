import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-homepage',
  template: `
        <erp-gantt></erp-gantt>
  `,
  styles: []
})
export class HomepageComponent implements OnInit {
  constructor() { }

  async ngOnInit() {

  }

}

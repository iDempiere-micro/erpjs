import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@erpjs/api-interfaces';

@Component({
  selector: 'erp-hello',
  template: `
    <div>hello works with {{hello$ | async | json}}</div>
  `,
  styles: []
})
export class HelloComponent implements OnInit {
  hello$ = this.http.get<Message>('/api/hello');

  constructor(private http: HttpClient,) { }

  ngOnInit() {
  }

}

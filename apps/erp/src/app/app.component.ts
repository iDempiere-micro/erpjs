import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@erpjs/api-interfaces';
import { Title } from '@angular/platform-browser';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'erp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  hello$ = this.http.get<Message>('/api/hello');

  constructor(
    private http: HttpClient,
    private titleService: Title,
    private auth: AuthService,
  ) {
    titleService.setTitle('@erpjs by NašeÚkoly.CZ s.r.o.');
  }

  ngOnInit() {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.auth.localAuthSetup();
  }
}

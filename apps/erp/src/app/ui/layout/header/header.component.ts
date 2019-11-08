import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'erp-header',
  template: `
      <header class="header-1">
          <div class="branding">
              <a class="nav-link">
                  <clr-icon shape="shield"></clr-icon>
                  <span class="title">{{title.getTitle()}}</span>
              </a>
          </div>
          <div class="header-nav">
              <a class="active nav-link nav-icon">
                  <clr-icon shape="home"></clr-icon>
              </a>
              <a class=" nav-link nav-icon">
                  <clr-icon shape="cog"></clr-icon>
              </a>
          </div>
          <form class="search">
              <label for="search_input">
                  <input id="search_input" type="text" placeholder="Search for keywords...">
              </label>
          </form>
          <div class="header-actions">
              <clr-dropdown class="dropdown bottom-right">
                  <button class="nav-icon" clrDropdownTrigger>
                      <clr-icon shape="user"></clr-icon>
                      <clr-icon shape="caret down"></clr-icon>
                  </button>
                  <clr-dropdown-menu clrPosition="bottom-right" *clrIfOpen>
                      <a clrDropdownItem>About</a>
                      <a clrDropdownItem>Preferences</a>
                      <a clrDropdownItem (click)="auth.logout()" *ngIf="auth.loggedIn">Log out</a>
                  </clr-dropdown-menu>
              </clr-dropdown>
          </div>
      </header>
      <nav class="subnav">
          <ul class="nav">
              <li class="nav-item">
                  <a class="nav-link active" href="#">Dashboard</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#">Projects</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#">Reports</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="#">Users</a>
              </li>
          </ul>
      </nav>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(
    public title:Title,
    public auth: AuthService,
  ) { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'erp-sidebar',
  template: `
      <nav>
          <section class="sidenav-content">
              <a class="nav-link active">Overview</a>
              <section class="nav-group collapsible">
                  <input id="tabexample0" type="checkbox">
                  <label for="tabexample0">Presales</label>
                  <ul class="nav-list">
                      <li><a class="nav-link" href="/prospects">Prospects</a></li>
                      <li><a class="nav-link" href="/leads">Leads</a></li>
                      <li><a class="nav-link" href="/calendarActivities">Activities</a></li>
                      <li><a class="nav-link" href="/tasks">Tasks</a></li>
                      <li><a class="nav-link">Reports</a></li>
                  </ul>
              </section>
              <section class="nav-group collapsible">
                  <input id="tabexample1" type="checkbox">
                  <label for="tabexample1">Delivery</label>
                  <ul class="nav-list">
                      <li><a class="nav-link" href="/customers">Customers</a></li>
                      <li><a class="nav-link" href="/salesInvoices">Sales Invoices</a></li>
                      <li><a class="nav-link" href="/editSalesInvoice/0">New Sales Invoice</a></li>
                      <li><a class="nav-link" href="/calendarActivities">Activities</a></li>
                      <li><a class="nav-link" href="/tasks">Tasks</a></li>
                      <li><a class="nav-link">Projects</a></li>
                      <li><a class="nav-link">Reports</a></li>
                  </ul>
              </section>
              <section class="nav-group collapsible">
                  <input id="tabexample2" type="checkbox">
                  <label for="tabexample2">System</label>
                  <ul class="nav-list">
                      <li><a class="nav-link" href="/users">Users</a></li>
                      <li><a class="nav-link">Settings</a></li>
                      <li><a class="nav-link" href="/accounts">Accounts</a></li>
                      <li><a class="nav-link" href="/products">Products</a></li>
                  </ul>
              </section>
          </section>
      </nav>
  `,
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

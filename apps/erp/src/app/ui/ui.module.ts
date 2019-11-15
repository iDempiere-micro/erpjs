import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainComponent } from './layout/main/main.component';
import { ClarityModule } from '@clr/angular';
import { PageNotFoundComponent } from './error/page-not-found.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CallbackComponent } from './support/callback/callback.component';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { CustomersComponent } from './list/customers/customers.component';
import { EditCustomerComponent } from './edit/customer/edit.customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServerTimeComponent } from './support/server.time/server.time.component';
import { HelloComponent } from './support/hello/hello.component';
import { DevelopmentTokenComponent } from './support/development.token/development.token.component';
import * as config from '../../../../../auth_config.json';
import { InvoicesComponent } from './list/invoices/invoices.component';
import { CustomerComponent } from './detail/customer/customer.component';
import { RouterModule } from '@angular/router';
import { TasksComponent } from './list/tasks/tasks.component';
import { CalendarActivitiesComponent } from './list/calendar.activities/calendar.activities.component';
import { UsersComponent } from './list/users/users.component';
import { EditTaskComponent } from './edit/task/edit.task.component';
import { UsersSelectComponent } from './select/users-select.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent, MainComponent, PageNotFoundComponent,
    HomepageComponent, CallbackComponent, CustomersComponent, EditCustomerComponent, ServerTimeComponent,
    HelloComponent, DevelopmentTokenComponent, InvoicesComponent, CustomerComponent, TasksComponent, CalendarActivitiesComponent, UsersComponent, EditTaskComponent, UsersSelectComponent],
  imports: [
    CommonModule, ClarityModule, ApolloModule, HttpLinkModule, ReactiveFormsModule, FormsModule, RouterModule
  ],
  providers:
  [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: `${config.api}/graphql`
          })
        }
      },
      deps: [HttpLink]
    },
  ],
  exports: [ LayoutComponent, PageNotFoundComponent, HomepageComponent ]
})
export class UiModule { }

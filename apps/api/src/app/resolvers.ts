import { AppResolver } from './app.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { SalesInvoiceResolver } from './resolvers/sales.invoice.resolver';
import { MenuResolver } from './resolvers/menu.resolver';
import { OrganizationResolver } from './resolvers/organization.resolver';

export const resolvers = [
  AppResolver,
  CustomerResolver,
  SalesInvoiceResolver,
  MenuResolver,
  OrganizationResolver,
];

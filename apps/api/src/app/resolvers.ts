import { AppResolver } from './app.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { SalesInvoiceResolver } from './resolvers/sales.invoice.resolver';

export const resolvers = [
  AppResolver,
  CustomerResolver,
  SalesInvoiceResolver,
];

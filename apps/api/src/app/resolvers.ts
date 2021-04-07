import { AppResolver } from './app.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { SalesInvoiceResolver } from './resolvers/sales.invoice.resolver';
import { MenuResolver } from './resolvers/menu.resolver';
import { OrganizationResolver } from './resolvers/organization.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { CurrencyResolver } from './resolvers/currency.resolver';
import { CountryResolver } from './resolvers/country.resolver';

export const resolvers = [
  AppResolver,

  CurrencyResolver,
  CustomerResolver,
  MenuResolver,
  OrganizationResolver,
  ProductResolver,
  SalesInvoiceResolver,
  CountryResolver,
];

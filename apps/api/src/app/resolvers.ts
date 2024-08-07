import { AppResolver } from './app.resolver';
import { AccountingSchemeResolver } from './resolvers/accounting.scheme.resolver';
import { AttachmentResolver } from './resolvers/attachment.resolver';
import { BankResolver } from './resolvers/bank.resolver';
import { ContactPersonCompanyRelationResolver } from './resolvers/contact.person.company.relation.resolver';
import { ContactPersonResolver } from './resolvers/contact.person.resolver';
import { CountryResolver } from './resolvers/country.resolver';
import { CurrencyResolver } from './resolvers/currency.resolver';
import { CustomerGroupResolver } from './resolvers/customer.group.resolver';
import { CustomerPriceListResolver } from './resolvers/customer.price.list.resolver';
import { CustomerProductPriceResolver } from './resolvers/customer.product.price.resolver';
import { CustomerResolver } from './resolvers/customer.resolver';
import { FactoringContractResolver } from './resolvers/factoring.contract.resolver';
import { FactoringProviderResolver } from './resolvers/factoring.provider.resolver';
import { MailResolver } from './resolvers/mail.resolver';
import { MenuResolver } from './resolvers/menu.resolver';
import { OrganizationResolver } from './resolvers/organization.resolver';
import { ProductResolver } from './resolvers/product.resolver';
import { SalesInvoiceResolver } from './resolvers/sales.invoice.resolver';
import { TaxResolver } from './resolvers/tax.resolver';

export const resolvers = [
  AppResolver,

  CurrencyResolver,
  CustomerResolver,
  MenuResolver,
  OrganizationResolver,
  ProductResolver,
  SalesInvoiceResolver,
  CountryResolver,
  BankResolver,
  AccountingSchemeResolver,
  CustomerGroupResolver,
  CustomerPriceListResolver,
  CustomerProductPriceResolver,
  ContactPersonCompanyRelationResolver,
  ContactPersonResolver,
  FactoringProviderResolver,
  FactoringContractResolver,
  AttachmentResolver,
  MailResolver,
  TaxResolver,
];

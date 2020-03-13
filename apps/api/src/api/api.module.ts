import { Module } from '@nestjs/common';
import { DateScalar, EntityModule, ModelModule } from '@erpjs/data';
import { AuthModule } from '../auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { UnauthorizedExceptionFilter } from './unauthorized-exception.filter';
import { GenericEntityResolver } from './genericEntity.resolver';
import { HomepageResolver } from './homepage.resolver';
import { CustomerResolver } from './customer.resolver';
import { SalesInvoiceResolver } from './sales.invoice.resolver';
import { InjectorImplementation } from './injector.implementation';
import { TaskResolver } from './task.resolver';
import { CalendarActivityResolver } from './calendar.activity.resolver';
import { UserResolver } from './user.resolver';
import { LeadResolver } from './lead.resolver';
import { ProspectResolver } from './prospect.resolver';
import { AccountResolver } from './account.resolver';
import { ProductResolver } from './product.resolver';
import { FileController } from './file.controller';
import { SalesInvoiceLineResolver } from './sales.invoice.line.resolver';
import { OrganizationResolver } from './organization.resolver';
import { TaxResolver } from './tax.resolver';
import { BankAccountResolver } from './bank.account.resolver';
import { CurrencyResolver } from './currency.resolver';
import { ConfigController } from './config.controller';
import { LanguageResolver } from './language.resolver';

@Module({
    imports: [EntityModule, AuthModule, ModelModule],
    providers: [DateScalar, GenericEntityResolver, HomepageResolver,
      CustomerResolver, SalesInvoiceResolver, TaskResolver, CalendarActivityResolver,
      UserResolver, LeadResolver, ProspectResolver, AccountResolver, ProductResolver, SalesInvoiceLineResolver,
      OrganizationResolver, TaxResolver, BankAccountResolver, CurrencyResolver, LanguageResolver,
        {
            provide: APP_FILTER,
            useClass: UnauthorizedExceptionFilter,
        }, InjectorImplementation,],
    exports: [
        DateScalar, GenericEntityResolver, HomepageResolver, CustomerResolver,
    ],
    controllers: [FileController, ConfigController],
})
export class ApiModule {
}

import { Module } from '@nestjs/common';
import { DateScalar, EntityModule, ModelModule } from '@erpjs/data';
import { AuthModule } from '../auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { UnauthorizedExceptionFilter } from './unauthorized-exception.filter';
import { GenericEntityResolver } from './genericEntity.resolver';
import { HomepageResolver } from './homepage.resolver';
import { CustomerResolver } from './customer.resolver';
import { InvoiceResolver } from './invoice.resolver';
import { InjectorImplementation } from './injector.implementation';
import { TaskResolver } from './task.resolver';
import { CalendarActivityResolver } from './calendar.activity.resolver';
import { UserResolver } from './user.resolver';

@Module({
    imports: [EntityModule, AuthModule, ModelModule],
    providers: [DateScalar, GenericEntityResolver, HomepageResolver,
      CustomerResolver, InvoiceResolver, TaskResolver, CalendarActivityResolver,
      UserResolver,
        {
            provide: APP_FILTER,
            useClass: UnauthorizedExceptionFilter,
        }, InjectorImplementation,],
    exports: [
        DateScalar, GenericEntityResolver, HomepageResolver, CustomerResolver,
    ],
    controllers: [],
})
export class ApiModule {
}

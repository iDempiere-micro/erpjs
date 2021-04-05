import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { SalesInvoice } from '../../model/generated/entities/SalesInvoice';
import {
  SalesInvoiceModel,
  SalesInvoiceService,
  SalesInvoiceServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
import { SalesInvoiceMonthlySaveArgs } from '../saveArgs/sales.invoice.monthly.save.args';
import { SalesInvoiceSaveArgs } from '../saveArgs/sales.invoice.save.args';
import { SalesInvoicesInTime } from '../dto/SalesInvoicesInTime';
import * as moment from 'moment';

@Resolver(() => SalesInvoice)
@UseGuards(GqlAuthGuard)
export class SalesInvoiceResolver {
  constructor(
    @Inject(SalesInvoiceServiceKey)
    protected readonly salesInvoiceService: SalesInvoiceService,
  ) {}

  @Query(() => [SalesInvoice])
  async salesInvoices() {
    return await this.salesInvoiceService.loadEntities(getManager(), {
      order: { id: 'DESC' },
    });
  }

  @Query(() => SalesInvoice)
  async salesInvoice(@Args('id', { type: () => Int }) id: number) {
    return await this.salesInvoiceService.loadEntityById(getManager(), id);
  }

  @Query(() => [SalesInvoicesInTime])
  async salesInvoicesReport() {
    const result = await this.salesInvoiceService.salesInvoicesReport(
      getManager(),
    );

    return result.map(({ year, month, organization_displayName, sum }) => ({
      group: organization_displayName,
      date: moment()
        .year(year)
        .month(month)
        .date(1)
        .format('YYYY-MM-DD'),
      value: sum,
    }));
  }

  @Mutation(() => [SalesInvoice])
  async createMonthlyInvoice(
    @Args('args') objData: SalesInvoiceMonthlySaveArgs,
    @CurrentUser() user,
  ): Promise<SalesInvoiceModel[]> {
    return await this.salesInvoiceService.createMonthlyInvoice(
      getManager(),
      objData,
      user,
    );
  }

  @Mutation(() => SalesInvoice)
  async createSalesInvoice(
    @Args('args') objData: SalesInvoiceSaveArgs,
    @CurrentUser() user,
  ): Promise<SalesInvoiceModel> {
    return await this.salesInvoiceService.save(getManager(), objData, user);
  }
}

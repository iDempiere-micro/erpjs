import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { SalesInvoice } from '../../model/generated/entities/SalesInvoice';
import {
  SalesInvoiceModel,
  SalesInvoicePublishArgsModel,
  SalesInvoiceService,
  SalesInvoiceServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
import {
  SalesInvoiceMonthlySaveArgs,
  SalesInvoicePublishArgs,
} from '../saveArgs/sales.invoice.monthly.save.args';
import { SalesInvoiceSaveArgs } from '../saveArgs/sales.invoice.save.args';
import { SalesInvoicesInTime } from '../dto/SalesInvoicesInTime';
import * as moment from 'moment';
import { BaseSaveArgs } from '../saveArgs/base.save.args';

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

  @Mutation(() => SalesInvoice)
  async duplicateSalesInvoice(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user,
  ) {
    return await this.salesInvoiceService.duplicate(getManager(), id, user);
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
  async saveSalesInvoice(
    @Args('args') objData: SalesInvoiceSaveArgs,
    @CurrentUser() user,
  ): Promise<SalesInvoiceModel> {
    return await this.salesInvoiceService.save(getManager(), objData, user);
  }

  @Mutation(() => SalesInvoice)
  async confirmSalesInvoice(
    @Args('args') objData: BaseSaveArgs,
    @CurrentUser() user,
  ): Promise<SalesInvoiceModel> {
    const id = objData.id;
    const invoice = await this.salesInvoiceService.loadEntityById(
      getManager(),
      id,
    );
    return await this.salesInvoiceService.confirm(getManager(), invoice, user);
  }

  @Mutation(() => SalesInvoice)
  async publishSalesInvoice(
    @Args('args') objData: SalesInvoicePublishArgs,
    @CurrentUser() user,
  ): Promise<SalesInvoiceModel> {
    return await this.salesInvoiceService.publish(getManager(), objData, user);
  }
}

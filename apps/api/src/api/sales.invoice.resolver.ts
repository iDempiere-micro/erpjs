import { BaseEntityResolver } from './base.entity.resolver';
import { SalesInvoiceModel, SalesInvoiceService, SalesInvoiceServiceKey } from '@erpjs/model';
import { CommonGetOneArgs, run, SalesInvoice } from '@erpjs/data';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { SalesInvoiceSaveArgs } from './args/sales.invoice.save.args';
import { BaseSaveArgs } from './args/base.save.args';
import { getManager } from 'typeorm';

export class SalesInvoiceResolver
  extends BaseEntityResolver<SalesInvoiceModel, SalesInvoiceSaveArgs, SalesInvoiceService>
{
  getService(): SalesInvoiceService {
    return this.salesInvoiceService;
  }
  constructor(
    @Inject(SalesInvoiceServiceKey) private readonly salesInvoiceService : SalesInvoiceService,
  ) { super(); }

  @Query(returns => [SalesInvoice])
  async invoices(
    @CurrentUser() user,
  ): Promise<Array<SalesInvoiceModel>> {
    return this.find(user);
  }

  @Mutation(returns => SalesInvoice)
  async salesInvoice(
    @Args('args') objData: SalesInvoiceSaveArgs , @CurrentUser() user,
  ): Promise<SalesInvoiceModel> {
    return this.save(user, objData);
  }

  @Mutation(returns => SalesInvoice)
  async confirmSalesInvoice(
    @Args('args') objData: BaseSaveArgs , @CurrentUser() user,
  ): Promise<SalesInvoiceModel> {
    return run( user, getManager(),
      async () => await this.salesInvoiceService.confirm(await this.getService().loadEntity(objData.id)));
  }

  @Query(returns => SalesInvoice)
  async salesInvoiceById(
    @Args() args: CommonGetOneArgs,
    @CurrentUser() user,
  ): Promise<SalesInvoiceModel> {
    return this.findById(args.id, user);
  }


}

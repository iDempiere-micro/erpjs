import { BaseEntityResolver } from './base.entity.resolver';
import { SalesInvoiceLineModel, SalesInvoiceLineService, SalesInvoiceLineServiceKey } from '@erpjs/model';
import { SalesInvoiceLineSaveArgs } from './args/sales.invoice.line.save.args';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { CommonGetOneArgs, SalesInvoiceLine } from '@erpjs/data';
import { User as CurrentUser } from './user.decorator';

export class SalesInvoiceLineResolver
  extends BaseEntityResolver<SalesInvoiceLineModel, SalesInvoiceLineSaveArgs, SalesInvoiceLineService>
{
  constructor(
    @Inject(SalesInvoiceLineServiceKey) private readonly salesInvoiceLineService: SalesInvoiceLineService,
  ){super();}

  getService(): SalesInvoiceLineService {
    return this.salesInvoiceLineService;
  }

  @Query(returns => [SalesInvoiceLine])
  async salesInvoiceLines(
    @CurrentUser() user,
  ): Promise<Array<SalesInvoiceLineModel>> {
    return this.find(user);
  }

  @Mutation(returns => SalesInvoiceLine)
  async salesInvoiceLine(
    @Args('args') objData: SalesInvoiceLineSaveArgs , @CurrentUser() user,
  ): Promise<SalesInvoiceLineModel> {
    return this.save(user, objData);
  }

  @Query(returns => SalesInvoiceLine)
  async salesInvoiceLineById(
    @Args() args: CommonGetOneArgs,
    @CurrentUser() user,
  ): Promise<SalesInvoiceLineModel> {
    return this.findById(args.id, user);
  }

}

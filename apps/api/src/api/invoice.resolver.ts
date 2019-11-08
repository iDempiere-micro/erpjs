import { BaseEntityResolver } from './base.entity.resolver';
import { SalesInvoiceModel, SalesInvoiceService } from '@erpjs/model';
import { InvoiceSaveArgs } from './args/invoice.save.args';
import { SalesInvoice } from '@erpjs/data';
import { Inject } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';

export class InvoiceResolver
  extends BaseEntityResolver<SalesInvoiceModel, InvoiceSaveArgs, SalesInvoiceService<any>>
{
  getCtor(): { new(...args: any[]): SalesInvoiceModel } {
    return SalesInvoice;
  }

  getService(): SalesInvoiceService<any> {
    return this.salesInvoiceService;
  }
  constructor(
    @Inject('SalesInvoiceService') private readonly salesInvoiceService : SalesInvoiceService<any>,
  ) { super(); }

  @Query(returns => [SalesInvoice])
  async invoices(
    @CurrentUser() user,
  ): Promise<Array<SalesInvoiceModel>> {
    return this.find(user);
  }

}

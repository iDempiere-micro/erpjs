import { BaseEntityResolver } from './base.entity.resolver';
import { SalesInvoiceModel, SalesInvoiceService, SalesInvoiceServiceKey } from '@erpjs/model';
import { InvoiceSaveArgs } from './args/invoice.save.args';
import { SalesInvoice } from '@erpjs/data';
import { Inject } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';

export class InvoiceResolver
  extends BaseEntityResolver<SalesInvoiceModel, InvoiceSaveArgs, SalesInvoiceService>
{
  getCtor(): { new(...args: any[]): SalesInvoiceModel } {
    return SalesInvoice;
  }

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

}

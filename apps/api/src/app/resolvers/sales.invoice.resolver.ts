import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth';
import { SalesInvoice } from '../../model/generated/entities/SalesInvoice';
import { SalesInvoiceService, SalesInvoiceServiceKey } from '../../model';
import { getManager } from 'typeorm';
import { Customer } from '../../model/generated/entities/Customer';

@Resolver(() => SalesInvoice)
@UseGuards(GqlAuthGuard)
export class SalesInvoiceResolver {
  constructor(
    @Inject(SalesInvoiceServiceKey)
    protected readonly salesInvoiceService: SalesInvoiceService,
  ) {}

  @Query(() => [SalesInvoice])
  async salesInvoices() {
    return await this.salesInvoiceService.loadEntities(getManager());
  }

  @Query(() => SalesInvoice)
  async salesInvoice(@Args('id', { type: () => Int }) id: number) {
    return await this.salesInvoiceService.loadEntityById(getManager(), id);
  }
}

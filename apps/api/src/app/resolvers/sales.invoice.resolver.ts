import { Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth';
import { SalesInvoice } from '../../model/generated/entities/SalesInvoice';
import {
  SalesInvoiceService,
  SalesInvoiceServiceKey,
} from '../../model';
import { getManager } from 'typeorm';

@Resolver(() => SalesInvoice )
@UseGuards(GqlAuthGuard)
export class SalesInvoiceResolver {
  constructor(
    @Inject(SalesInvoiceServiceKey) protected readonly salesInvoiceService: SalesInvoiceService,
  ) {
  }

  @Query(()=>[SalesInvoice])
  async salesInvoices() {
    return await this.salesInvoiceService.loadEntities(getManager())
  }
}

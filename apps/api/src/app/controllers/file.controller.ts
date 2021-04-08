import { Controller, Get, Inject, Param, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { SalesInvoiceService, SalesInvoiceServiceKey } from '../../model';
import { getManager } from 'typeorm';

type DownloadedFile = {
  data?: string;
};

@UseGuards(GqlAuthGuard)
@Controller('file')
export class FileController {
  constructor(
    @Inject(SalesInvoiceServiceKey)
    protected readonly salesInvoiceService: SalesInvoiceService,
  ) {}

  @Get('sales-invoice/:invoiceId')
  async downloadInvoice(
    @Param('invoiceId') invoiceId,
    @CurrentUser() user,
  ): Promise<DownloadedFile> {
    const invoice = await this.salesInvoiceService.loadEntityById(
      getManager(),
      invoiceId,
    );
    const buffer = (invoice.content as any) as Buffer;
    if (user && buffer) {
      const data = buffer.toString('base64');
      return { data };
    }
    return { data: null };
  }
}

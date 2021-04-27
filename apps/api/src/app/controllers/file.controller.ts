import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import {
  CustomerService,
  CustomerServiceKey,
  SalesInvoiceService,
  SalesInvoiceServiceKey,
} from '../../model';
import { getManager } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';

type DownloadedFile = {
  data?: string;
};

@UseGuards(GqlAuthGuard)
@Controller('file')
export class FileController {
  constructor(
    @Inject(SalesInvoiceServiceKey)
    protected readonly salesInvoiceService: SalesInvoiceService,
    @Inject(CustomerServiceKey)
    protected readonly customerService: CustomerService,
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

  @Post('upload-customer-photo/:customerId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('customerId') customerId,
    @CurrentUser() user,
  ) {
    const manager = getManager();
    console.log('*** file upload', customerId, file);
    const { buffer } = file;

    const customer = await this.customerService.loadEntityById(
      manager,
      customerId,
    );
    customer.photo = '\\x' + buffer.toString('hex');
    await this.customerService.persist(manager, customer, user);

    return { success: true };
  }

  @Get('customer-photo/:customerId')
  async downloadCustomerPhone(
    @Param('customerId') customerId,
    @CurrentUser() user,
  ): Promise<DownloadedFile> {
    const invoice = await this.customerService.loadEntityById(
      getManager(),
      customerId,
    );
    const buffer = (invoice.photo as any) as Buffer;
    if (user && buffer) {
      const data = buffer.toString('base64');
      return { data };
    }
    return { data: null };
  }
}

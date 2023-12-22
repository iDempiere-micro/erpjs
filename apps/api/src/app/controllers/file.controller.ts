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
import { EntityManager } from 'typeorm';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  AttachmentService,
  AttachmentServiceKey,
} from '../../model/lib/attachment.service';
import { InjectEntityManager } from '@nestjs/typeorm';

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
    @Inject(AttachmentServiceKey)
    protected readonly attachmentService: AttachmentService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Get('sales-invoice/:invoiceId')
  async downloadInvoice(
    @Param('invoiceId') invoiceId,
    @CurrentUser() user,
  ): Promise<DownloadedFile> {
    if (!user) {
      return { data: null };
    }

    const invoice = await this.salesInvoiceService.loadEntityById(
      this.entityManager,
      invoiceId,
    );
    const buffer = invoice.content as any as Buffer;
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
    if (!user) {
      return { success: false };
    }

    const manager = this.entityManager;
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
  async downloadCustomerPhoto(
    @Param('customerId') customerId,
    @CurrentUser() user,
  ): Promise<DownloadedFile> {
    if (!user) {
      return { data: null };
    }
    const invoice = await this.customerService.loadEntityById(
      this.entityManager,
      customerId,
    );
    const buffer = invoice.photo as any as Buffer;
    if (user && buffer) {
      const data = buffer.toString('base64');
      return { data };
    }
    return { data: null };
  }

  @Get('attachment/:attachmentId')
  async downloadAttachment(
    @Param('attachmentId') attachmentId,
    @CurrentUser() user,
  ): Promise<DownloadedFile> {
    if (!user) {
      return { data: null };
    }

    const data = await this.attachmentService.getFileAsBase64(attachmentId);
    if (user && data) {
      return { data };
    }
    return { data: null };
  }
}

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ModelModule, run } from '@erpjs/data';
import { getManager } from 'typeorm';
import { ControllerUser as CurrentUser } from './user.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('file')
export class FileController {
  @Get('sales-invoice/:invoiceId')
  async downloadInvoice(@Param('invoiceId') invoiceId, @CurrentUser() user,): Promise<object> {
    return run( user, getManager(),async () =>
      {
        const {salesInvoiceService} = ModelModule.getInjector();
        const invoice = await salesInvoiceService.loadEntity(invoiceId);
        const buffer = invoice.content as any as Buffer;
        if (buffer) {
          const data = buffer.toString('base64');
          return { data };
        }
        return { data: null };
      }
    );
  }
}

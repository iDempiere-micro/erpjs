import { schedule } from 'node-cron';
import { getManager } from 'typeorm';
import { SalesInvoice } from '../entities/sales.invoice';
import { SalesInvoiceJob } from '@erpjs/model';
import { DocumentNumberingService } from './document.numbering.service';
import { SalesInvoiceServiceImplementation } from './sales.invoice.service.implementation';
import { ReportsService } from '../services/reports.service';
import { runJob } from '@erpjs/data';

export class SalesInvoiceJobImplementation {
  static plan() {
    schedule('* * * * *', () => {
      // SalesInvoiceJobImplementation.assignDocumentNumbers();
    });
    SalesInvoiceJobImplementation.assignDocumentNumbers();
  }

  static async assignDocumentNumbers() {
    await getManager().transaction(async manager => {
      await runJob(getManager(), async () => {
        const salesInvoiceJob = new SalesInvoiceJob();
        const salesInvoiceServiceImplementation = new SalesInvoiceServiceImplementation();
        const documentNumberingService = new DocumentNumberingService(manager);
        const invoices = await manager.createQueryBuilder()
          .setLock('pessimistic_write')
          .select('invoice')
          .from(SalesInvoice, 'invoice')
          .where(
            `invoice.isDraft = :isDraft and invoice.documentNo is NULL`,
            { isDraft: false, })
          .orderBy('id')
          .getMany();

        await salesInvoiceJob.assignDocumentNumbers(invoices, documentNumberingService);

        const reportsService = new ReportsService();
        for (const invoice of invoices) {
          await manager.save(invoice);
          const printed = await reportsService.printSalesInvoice(invoice);
          await manager.save(printed);
        }
      });
    });
  }
}

import { getManager } from 'typeorm';
import { SalesInvoice } from '../entities/sales.invoice';
import { SalesInvoiceJob } from '@erpjs/model';
import { DocumentNumberingService } from './document.numbering.service';
import { SalesInvoiceServiceImplementation } from './sales.invoice.service.implementation';
import { ReportsService } from '../services/reports.service';
import { ModelModule, runJob } from '@erpjs/data';

export class SalesInvoiceJobImplementation {
  static plan() {
/*    schedule('* * * * *', () => {
      SalesInvoiceJobImplementation.calculate();
      SalesInvoiceJobImplementation.assignDocumentNumbers();
    });
    SalesInvoiceJobImplementation.calculate();
    SalesInvoiceJobImplementation.assignDocumentNumbers();*/

    // at least fix the print errors
    SalesInvoiceJobImplementation.fixPrint().then()
  }

  static async fixPrint() {
    await getManager().transaction(async manager => {
      await runJob(manager, async () => {
        const salesInvoiceJob = new SalesInvoiceJob();
        const salesInvoiceServiceImplementation = new SalesInvoiceServiceImplementation();
        const documentNumberingService = new DocumentNumberingService();
        const invoices = await manager.createQueryBuilder()
          .setLock('pessimistic_write')
          .select('invoice')
          .from(SalesInvoice, 'invoice')
          .where(
            `invoice.content is NULL`,
            { })
          .orderBy('id')
          .getMany();

        const { translationService } = ModelModule.getInjector();
        const reportsService = new ReportsService(translationService);
        for (const invoice of invoices) {
          const printed = await reportsService.printSalesInvoice(invoice, invoice.printLanguage);
          await manager.save(printed);
        }
      });
    });

  }

  static async calculate() {
    await getManager().transaction(async manager => {
      await runJob(manager, async () => {
        const salesInvoiceJob = new SalesInvoiceJob();
        const salesInvoiceServiceImplementation = new SalesInvoiceServiceImplementation();
        const invoices = await manager.createQueryBuilder()
          .setLock('pessimistic_write')
          .select('invoice')
          .from(SalesInvoice, 'invoice')
          .where(
            `invoice.isCalculated = :isCalculated`,
            { isCalculated: false, })
          .orderBy('id')
          .getMany();

        for (const invoice of invoices) {
          const calculatedInvoice = await salesInvoiceServiceImplementation.calculatePrices(invoice);
          await manager.save(calculatedInvoice);
        }
      });
    });
  }
  static async assignDocumentNumbers() {
    await getManager().transaction(async manager => {
      await runJob(manager, async () => {
        const salesInvoiceJob = new SalesInvoiceJob();
        const salesInvoiceServiceImplementation = new SalesInvoiceServiceImplementation();
        const documentNumberingService = new DocumentNumberingService();
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

        const { translationService } = ModelModule.getInjector();
        const reportsService = new ReportsService(translationService);
        for (const invoice of invoices) {
          await manager.save(invoice);
          const printed = await reportsService.printSalesInvoice(invoice, invoice.printLanguage);
          await manager.save(printed);
        }
      });
    });
  }
}

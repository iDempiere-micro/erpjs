import {
  BankAccountModel,
  CurrencyModel,
  CustomerModel,
  InvoiceSaveArgsModel,
  OrganizationModel,
  ProductQuantityPriceTaxModel,
  SalesInvoiceService
} from '@erpjs/model';
import { SalesInvoice } from '../entities/sales.invoice';
import { EntityManager } from 'typeorm';
import { SalesInvoiceLine } from '../entities/sales.invoice.line';
import { findOneById } from './find';
import { Tax } from '../entities/tax';
import { Product } from '../entities/product';
import { SalesInvoiceVat } from '../entities/sales.invoice.vat';
import { Injectable } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { ModelModule } from '@erpjs/data';

@Injectable()
export class SalesInvoiceServiceImplementation extends SalesInvoiceService<SalesInvoice> {
    async createEntity(): Promise<SalesInvoice> {
      return Promise.resolve(new SalesInvoice());
    }
    async loadEntity(id: number): Promise<SalesInvoice> {
      return await ModelModule.getEntityManager().getRepository(SalesInvoice).findOne(id);
    }
    async save(args: InvoiceSaveArgsModel): Promise<SalesInvoice> {
      const invoice =
        args.id ? await this.loadEntity(args.id) : await this.createEntity();
      invoice.dueDate = args.dueDate;
      return await ModelModule.getEntityManager().save(invoice);
    }

  async create(
    bankAccount: BankAccountModel,
    customer: CustomerModel,
    organization: OrganizationModel,
    paymentTermInDays: number,
    transactionDate: Date,
    currency: CurrencyModel,
    lines: Array<ProductQuantityPriceTaxModel>,
    manager: EntityManager,
  ): Promise<SalesInvoice> {
    const invoice =  await super.createSalesInvoice(
      bankAccount,
      customer,
      organization,
      paymentTermInDays,
      transactionDate,
      currency,
    );

    await manager.save(invoice);

    const vatRegistrations = await organization.vatRegistrations;
    const vatRegistered = (vatRegistrations && vatRegistrations.length > 0);

    let order = 10;
    for(const line of lines) {
      const line1 = new SalesInvoiceLine();
      line1.lineTax =
        Promise.resolve(
          vatRegistered ? await findOneById(manager, await line.lineTax, Tax)
            : await manager.getRepository(Tax).findOne( {where: {ratePercent : 0}} )
        )
      ;
      line1.product = Promise.resolve(await findOneById(manager, await line.product, Product));
      line1.lineOrder = order;
      line1.linePrice = line.linePrice;
      line1.quantity = line.quantity;
      line1.invoice = Promise.resolve(invoice);
      line1.narration = line.narration;
      await manager.save(line1);
      order += 10;
    }

    return await findOneById(manager, invoice, SalesInvoice);
  }

  async calculate(
    invoice1: SalesInvoice,
    currencyMultiplyingRateToAccountingSchemeCurrency: number,
    manager: EntityManager,
  ): Promise<SalesInvoice> {
    const invoice = await super.calculatePrices(invoice1, currencyMultiplyingRateToAccountingSchemeCurrency);
    const vatReportNew = [];
    for ( const vatReport of await invoice.vatReport ) {
      const vatReport2 = new SalesInvoiceVat();
      vatReport2.invoice = Promise.resolve(invoice1);
      vatReport2.vatRatePercent = vatReport.vatRatePercent;
      vatReport2.vatTotalRaw = vatReport.vatTotalRaw;
      vatReport2.vatTotalAccountingSchemeCurrencyRaw = vatReport.vatTotalAccountingSchemeCurrencyRaw;
      vatReport2.vatTotal = vatReport.vatTotal;
      vatReport2.vatTotalAccountingSchemeCurrency = vatReport.vatTotalAccountingSchemeCurrency;
      await manager.save(vatReport2);
      vatReportNew.push(vatReport2);
    }
    invoice.vatReport = Promise.resolve(vatReportNew);
    await manager.save(invoice);

    const result = Promise.resolve(await findOneById(manager, invoice, SalesInvoice));
    const reportsService = new ReportsService();
    const printed = await reportsService.printSalesInvoice(await result);
    await manager.save(printed);
    return result;
  }
}

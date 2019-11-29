import { BaseEntityServiceImplementation } from './base.entity.service';
import { RecurringSalesInvoiceModel } from '../entities/recurring.sales.invoice.model';
import { RecurringSalesInvoiceSaveArgsModel } from '../args/recurring.sales.invoice.save.args.model';

export const RecurringSalesInvoiceServiceKey = 'RecurringSalesInvoiceService';

export class RecurringSalesInvoiceService
  extends BaseEntityServiceImplementation<RecurringSalesInvoiceModel, RecurringSalesInvoiceSaveArgsModel>
{
  protected async doSave(args: RecurringSalesInvoiceSaveArgsModel, entity: RecurringSalesInvoiceModel): Promise<RecurringSalesInvoiceModel> {
    const {
      currencyService,
      organizationService,
      recurringSalesInvoiceService,
      customerService,
      bankAccountService,
    } = this.getInjector();
    entity.organization = Promise.resolve(
      args.organization ? args.organization : await organizationService.getOrg(args.organizationDisplayName) );
    entity.currency = Promise.resolve(
      args.currency ? args.currency : await currencyService.getCurrency(args.currencyIsoCode)
    );
    entity.bankAccount = Promise.resolve(
        args.bankAccount ? args.bankAccount : await bankAccountService.getBankAccount(args.bankAccountDisplayName)
    );
    entity.customer = Promise.resolve(
      args.customer ? args.customer : await customerService.getCustomer(args.customerDisplayName)
    );
    entity.cronPattern = args.cronPattern;
    entity.lastDayInMonth = args.lastDayInMonth;
    entity.paymentTermInDays = args.paymentTermInDays;
    await this.persist(entity);

    let lineOrder = 10;
    const invoiceLines = [];
    for(const line1 of args.lines) {
      const line = await this.getInjector().recurringSalesInvoiceLineService.save(
        {
          ...line1,
          product: await line1.product,
          lineTax: await line1.lineTax,
          invoice : entity,
          lineOrder,
        }
      );
      lineOrder += 10;
      invoiceLines.push(line);
    }
    entity.lines = Promise.resolve(invoiceLines);

    return entity;
  }

  typeName(): string {
    return RecurringSalesInvoiceServiceKey;
  }

}

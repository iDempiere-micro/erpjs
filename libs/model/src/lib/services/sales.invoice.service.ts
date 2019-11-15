import { dateToISO, groupBy, onlyDate, roundNumber, sum } from '../../util';
import { SalesInvoiceModel } from '../entities/sales.invoice.model';
import { BaseEntityServiceImplementation } from './base.entity.service';
import { SalesInvoiceSaveArgsModel } from '../args/sales.invoice.save.args.model';
import { SalesInvoiceVatModel } from '../entities/sales.invoice.vat.model';

export const SalesInvoiceServiceKey = 'SalesInvoiceService';

export class SalesInvoiceService extends BaseEntityServiceImplementation<SalesInvoiceModel, SalesInvoiceSaveArgsModel> {
  protected async doSave(args: SalesInvoiceSaveArgsModel, invoice: SalesInvoiceModel): Promise<SalesInvoiceModel> {
    invoice.bankAccount = Promise.resolve(args.bankAccount);
    invoice.customer = Promise.resolve(args.customer);
    invoice.organization = Promise.resolve(args.organization);
    invoice.issuedOn = onlyDate(new Date());
    invoice.dueDate = onlyDate(new Date(+invoice.issuedOn + args.paymentTermInDays * 86400000));
    invoice.grandTotal = 0;
    invoice.grandTotalAccountingSchemeCurrency = 0;
    invoice.totalLines = 0;
    invoice.totalLinesAccountingSchemeCurrency = 0;
    invoice.transactionDate = args.transactionDate;
    invoice.currency = Promise.resolve(args.currency);
    invoice.currencyMultiplyingRateToAccountingSchemeCurrency = 0;
    invoice.narration = 'invalid';
    invoice.isDraft = true;
    invoice.isCalculated = false;
    await this.persist(invoice);

    const vatRegistrations = await args.organization.vatRegistrations;
    const vatRegistered = (vatRegistrations && vatRegistrations.length > 0);

    let lineOrder = 10;
    const invoiceLines = [];
    for(const line1 of args.lines) {
      const line = await this.getInjector().salesInvoiceLineService.save(
        {
          ...line1,
          product: await line1.product,
          lineTax: vatRegistered ? await line1.lineTax : await this.getInjector().taxService.getZeroTax(),
          invoice,
          lineOrder,
        }
      );
      lineOrder += 10;
      invoiceLines.push(line);
    }
    invoice.lines = Promise.resolve(invoiceLines);

    return invoice;
  }

  typeName(): string {
    return SalesInvoiceServiceKey;
  }

  async calculatePrices(
    invoiceWithLines: SalesInvoiceModel,
    currencyMultiplyingRateToAccountingSchemeCurrency: number,
  ): Promise<SalesInvoiceModel> {
    if (!invoiceWithLines) return invoiceWithLines;

    const lines = await invoiceWithLines.lines;

    invoiceWithLines.totalLines = 0;
    invoiceWithLines.grandTotal = 0;
    const org = await invoiceWithLines.organization;
    const vatRegistrations = await org.vatRegistrations;
    const vatRegistered = (vatRegistrations && vatRegistrations.length > 0);
    const lineCalculatedTaxes = [];
    if (lines) {
      for (const line of lines) {
        // make sure we work with number, so do not use +=
        invoiceWithLines.totalLines = +invoiceWithLines.totalLines + line.linePrice;
        const lineTax = await line.lineTax;
        const vatTotal =
          vatRegistered ? +line.linePrice * (+lineTax.ratePercent / 100) : 0;

        const lineCalculatedTax = {
          vatRatePercent: vatRegistered ? lineTax.ratePercent : 0,
          vatTotal,
          vatTotalAccountingSchemeCurrency: vatTotal * currencyMultiplyingRateToAccountingSchemeCurrency
        };
        lineCalculatedTaxes.push(lineCalculatedTax);
        // make sure we work with number, so do not use +=
        invoiceWithLines.grandTotal = +invoiceWithLines.grandTotal + line.linePrice + lineCalculatedTax.vatTotal;
      }
    }
    const taxes = await groupBy(lineCalculatedTaxes, x => x.vatRatePercent);
    const vatReport: SalesInvoiceVatModel[] = [];
    for (const [vatRatePercent, toBeSummed] of taxes) {
      const vatTotal = sum(toBeSummed.map(x => x.vatTotal));
      const vatTotalAccountingSchemeCurrency = sum(toBeSummed.map(x => x.vatTotalAccountingSchemeCurrency));
      vatReport.push(
        await this.getInjector().salesInvoiceVatService.save(
          {
            vatRatePercent: vatRatePercent as number,
            vatTotalRaw: vatTotal,
            vatTotal: roundNumber(vatTotal, 2),
            vatTotalAccountingSchemeCurrencyRaw: vatTotalAccountingSchemeCurrency,
            vatTotalAccountingSchemeCurrency: roundNumber(vatTotalAccountingSchemeCurrency, 2),
            invoice: invoiceWithLines,
          }
        )
      );
    }

    invoiceWithLines.vatReport = Promise.resolve(vatReport);
    invoiceWithLines.totalLinesAccountingSchemeCurrency =
      roundNumber(invoiceWithLines.totalLines * currencyMultiplyingRateToAccountingSchemeCurrency, 2);
    invoiceWithLines.totalLines = roundNumber(invoiceWithLines.totalLines, 2);
    invoiceWithLines.grandTotalAccountingSchemeCurrency =
      roundNumber(invoiceWithLines.grandTotal * currencyMultiplyingRateToAccountingSchemeCurrency, 2);
    invoiceWithLines.grandTotal = roundNumber(invoiceWithLines.grandTotal, 2);

    invoiceWithLines.currencyMultiplyingRateToAccountingSchemeCurrency =
      currencyMultiplyingRateToAccountingSchemeCurrency;
    invoiceWithLines.narration =
      `${(await invoiceWithLines.organization || { displayName: 'noorg' }).displayName} -> ` +
      `${(await invoiceWithLines.customer || { displayName: 'nocust' }).displayName || ''}:` +
      `${dateToISO(invoiceWithLines.issuedOn)}:${invoiceWithLines.grandTotal}:${dateToISO(invoiceWithLines.dueDate)}`;
    invoiceWithLines.isCalculated = true;
    return invoiceWithLines;
  }
}


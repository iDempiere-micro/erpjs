import {
  BankAccountModel,
  BaseEntityService,
  CurrencyModel,
  CustomerModel,
  InvoiceSaveArgsModel,
  OrganizationModel,
  SalesInvoiceModel,
  SalesInvoiceVatModel
} from '../..';
import { dateToISO, groupBy, onlyDate, roundNumber, sum } from '../../util';

export abstract class SalesInvoiceService<T extends SalesInvoiceModel>
  implements BaseEntityService<T, InvoiceSaveArgsModel> {

  abstract createEntity(): Promise<T>;
  abstract loadEntity(id: number): Promise<T>;
  abstract save(args: InvoiceSaveArgsModel): Promise<T>;

  async createSalesInvoice(
    bankAccount: BankAccountModel,
    customer: CustomerModel,
    organization: OrganizationModel,
    paymentTermInDays: number,
    transactionDate: Date,
    currency: CurrencyModel,
  ): Promise<T> {
    const invoice = await this.createEntity();
    invoice.bankAccount = Promise.resolve(bankAccount);
    invoice.customer = Promise.resolve(customer);
    invoice.organization = Promise.resolve(organization);
    invoice.issuedOn = onlyDate(new Date());
    invoice.dueDate = onlyDate(new Date(+invoice.issuedOn + paymentTermInDays * 86400000));
    invoice.grandTotal = 0;
    invoice.grandTotalAccountingSchemeCurrency = 0;
    invoice.totalLines = 0;
    invoice.totalLinesAccountingSchemeCurrency = 0;
    invoice.transactionDate = transactionDate;
    invoice.currency = Promise.resolve(currency);
    invoice.currencyMultiplyingRateToAccountingSchemeCurrency = 0;
    invoice.narration = 'invalid';
    invoice.isDraft = true;
    invoice.isCalculated = false;

    return invoice;
  }

  async calculatePrices(
    invoiceWithLines: T,
    currencyMultiplyingRateToAccountingSchemeCurrency: number,
  ): Promise<T> {
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
        {
          vatRatePercent: vatRatePercent as number,
          vatTotalRaw: vatTotal,
          vatTotal: roundNumber(vatTotal, 2),
          vatTotalAccountingSchemeCurrencyRaw: vatTotalAccountingSchemeCurrency,
          vatTotalAccountingSchemeCurrency: roundNumber(vatTotalAccountingSchemeCurrency, 2),
        }
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

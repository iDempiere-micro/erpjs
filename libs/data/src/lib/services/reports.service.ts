import { Injectable } from '@nestjs/common';
import { PrintSalesInvoice, PrintSalesInvoiceParty, SalesInvoiceModel } from '@erpjs/model';
import { onlyDate, roundNumber } from '@erpjs/util';

const jsreport = require('jsreport-core')();
const fs = require('fs');
const moment = require('moment');
jsreport.init();/*.then(() => {
  jsreport.use(require('jsreport-chrome-pdf')(
    {
      launchOptions: {
        // executablePath: '~/dev/erp/node_modules/puppeteer/.local-chromium/linux-686378/chrome-linux',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      }
    }
  ));
  jsreport.use( require('handlebars') )();
}
);*/


@Injectable()
export class ReportsService {
  async printSalesInvoice(data: SalesInvoiceModel) {
    const organization = await data.organization;
    const accountingScheme = await organization.accountingScheme;
    const organizationLegalAddress = await organization.legalAddress;
    const vatRegistrations = await organization.vatRegistrations;
    const vatRegistered = (vatRegistrations && vatRegistrations.length > 0);
    const vatNumber = vatRegistered ? vatRegistrations[0].vatNumber : '';
    const seller = {
      name: organization.legalName,
      road: organizationLegalAddress.line1,
      city: organizationLegalAddress.city,
      country: (await organizationLegalAddress.country).displayName,
      vatNumber,
      zipCode: organizationLegalAddress.zipCode,
      registration: organization.registration,
      idNumber: '24180149',
    };
    const customer = await data.customer;
    const customerLegalAddress = await customer.legalAddress;
    const buyer: PrintSalesInvoiceParty = {
      name: customer.legalName,
      road: customerLegalAddress.line1,
      city: customerLegalAddress.city,
      country: (await customerLegalAddress.country).displayName,
      vatNumber: customer.vatNumber,
      zipCode: customerLegalAddress.zipCode,
    };

    function dateToString(d:Date): string{
      return moment(onlyDate(d)).format('DD.MM.YYYY');
    }

    const items = [];

    for ( const line of await data.lines ) {
      const lineTaxPercent = (await line.lineTax).ratePercent;
      items.push(
        {
          name: (await line.product).displayName,
          itemPrice: roundNumber(line.linePrice / line.quantity,2),
          items: line.quantity,
          totalLine: line.linePrice,
          vatRatePercent: lineTaxPercent,
          totalLineToBePaid: roundNumber( line.linePrice * ( 1 + lineTaxPercent/ 100 ), 2 ),
          description: line.narration,
        }
      );
    }
    const bankAccount = (await data.bankAccount);

    const converted = {
      transactionDatePrintable: dateToString(data.transactionDate),
      issuedOnPrintable: dateToString(data.issuedOn),
      dueDatePrintable: dateToString(data.dueDate),
      invoiceNumber: data.displayName,
      payTo: bankAccount.bankAccountCustomerPrintableNumber,
      iban: bankAccount.iban,
      swift: bankAccount.swift,
      seller,
      buyer,
      items,
      totalLines: (+data.totalLines).toFixed(2),
      grandTotal: (+data.grandTotal).toFixed(2),
      currency: (await data.currency).displayName,
      currencyMultiplyingRateToAccountingSchemeCurrency: (+data.currencyMultiplyingRateToAccountingSchemeCurrency).toFixed(3),
      accountingSchemeCurrency: accountingScheme ? (await accountingScheme.currency).displayName : '###',
      totalLinesAccountingSchemeCurrency: (+data.totalLinesAccountingSchemeCurrency).toFixed(2),
      grandTotalAccountingSchemeCurrency: (+data.grandTotalAccountingSchemeCurrency).toFixed(2),
      vatReport:
        (await data.vatReport).map(
          x=>({
              vatRatePercent:(+x.vatRatePercent).toFixed(0),
              vatTotal: (+x.vatTotal).toFixed(2),
              vatTotalAccountingSchemeCurrency: (+x.vatTotalAccountingSchemeCurrencyRaw).toFixed(2)
            })
        ),
      printRate: (await data.currency).displayName !== (accountingScheme ? (await accountingScheme.currency).displayName : '###'),
      vatRegistered,
      buyerEmail: customer.invoicingEmail,
      sellerContact: organization.contact,
    };

    try {
      data.content = await this.printInvoice(converted);
      data.printed = true;
      data.printDate = new Date();
    } catch (e) {
      data.printError = '' + e;
    }
    return data;
  }

  async printInvoice(data: PrintSalesInvoice): Promise<string> {
    const template = '/assets/invoice.html';
    const content =
      fs.existsSync('./apps/api/src/assets/invoice.html') ?
        fs.readFileSync(`./apps/api/src${template}`, 'utf8')
        : fs.readFileSync(`.${template}`, 'utf8');

    const result = await jsreport.use(require('jsreport-chrome-pdf')(
      {
        launchOptions: {
          executablePath: './node_modules/puppeteer/.local-chromium/linux-686378/chrome-linux',
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }
      }
    )).use(require('handlebars'))
      .render({
        template: {
          content,
          engine: 'handlebars',
          recipe: 'chrome-pdf'
        },
        data
      });
    const resultFile = `/tmp/invoice-${data.invoiceNumber}-${Date.now()}`;
    fs.writeFileSync(`${resultFile}.pdf`, result.content);
    fs.writeFileSync(`${resultFile}.json`, JSON.stringify(data));
    return '\\x' + result.content.toString('hex');
  }

}

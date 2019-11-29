import { Injectable } from '@nestjs/common';
import { moment, PrintSalesInvoice, PrintSalesInvoiceParty, SalesInvoiceModel } from '@erpjs/model';
import { onlyDate, roundNumber } from '@erpjs/util';
import { ReportsServiceModel } from '../../../../model/src/lib/service.interfaces/reports.service.model';

const fs = require('fs');
const PDFDocument = require('pdfkit');


async function createInvoice(path: string, invoice: PrintSalesInvoice) {
  const doc = new PDFDocument({ margin: 50 });

  const fontPath = fs.existsSync('./Cardo-Regular.ttf') ? './' : './apps/api/src/assets/';

  doc.registerFont('Cardo', `${fontPath}Cardo-Regular.ttf`);
  doc.registerFont('Cardo-Bold', `${fontPath}Cardo-Bold.ttf`);

  const logo = 'logo.png';

  function generateHeader() {

    doc
      .font('Cardo-Bold')
      .fillColor('#444444')
      .fontSize(20)
      .text(`Invoice ${invoice.vatRegistered ? '- VAT': ''} ${invoice.invoiceNumber}`, 200, 57, { align: 'right' })
      .font('Cardo')
      .fontSize(10);

    doc
      .font('Cardo')
      .text(`Created: ${invoice.issuedOnPrintable}`, 200, 87, { align: 'right' })
      .text(`Due: ${invoice.dueDatePrintable}`, 200, 87 + 15, { align: 'right' })
      .text(`Details: ${invoice.invoiceNumber}`, 200, 87 + 2*15, { align: 'right' });

    let line = 87 + 60;
    if (invoice.vatRegistered) {
      doc
        .font('Cardo')
        .text(`The Date of Taxable Supply: ${invoice.transactionDatePrintable}`, 200, 87 + 3*15, { align: 'right' });
      line += 15;
    }

    const seller = invoice.seller;
    const buyer = invoice.buyer;

    doc
      .font('Cardo-Bold')
      .text('Supplier:', 20, line)
      .font('Cardo')
      .text(seller.name, 20, line + 15)
      .text(seller.road, 20, line + 2*15)
      .text(seller.zipCode + ' ' + invoice.seller.city, 20, line + 3*15)
      .text(seller.country, 20, line + 4*15)
      .text(invoice.sellerContact, 20, line + 5*15)
      .text(seller.registration, 20, line + 6*15)
      .text(`ID: ${seller.idNumber}`, 20, line + 7*15)
      .text(seller.vatNumber && invoice.vatRegistered ? `VAT ID: ${seller.vatNumber}` : '', 20, line + 8*15)
      .text(`Bank Account: ${invoice.payTo}`,20, line + 9*15)
      .text(`IBAN: ${invoice.iban}`,20, line + 10*15)
      .text(`SWIFT: ${invoice.swift}`,20, line + 11*15)


      .font('Cardo-Bold')
      .text('Customer:', 200, line, { align: 'right' })
      .font('Cardo')
      .text(buyer.name, 200, line + 15, { align: 'right' })
      .text(buyer.road, 200, line + 2*15, { align: 'right' })
      .text(buyer.zipCode + ' ' + buyer.city, 200, line + 3*15, { align: 'right' })
      .text(buyer.country, 200, line + 4*15, { align: 'right' })
      .text(invoice.buyerEmail, 200, line + 5*15, { align: 'right' })
      .text(`ID: ${buyer.idNumber}`, 200, line + 6*15, { align: 'right' })
      .text(buyer.vatNumber && invoice.vatRegistered ? `VAT ID: ${buyer.vatNumber}` : '', 200, line + 7*15, { align: 'right' })

      .moveDown();
  }

  function generateFooter() {
    doc
      .font('Cardo')
      .fontSize(5)
      .text(
        `Thank you for your business!`,
        50,
        700,
        { align: 'center', width: 500 }
      );
  }


  function generateTableRow(y, c1, c2, c3, c4, c5, c6, r2) {
    doc
      .font('Cardo')
      .fontSize(10)
      .text(c1, 50, y)
      .text(c2, 150, y)
      .text(c3, 180, y, { width: 90, align: 'right' });

    if (invoice.vatRegistered) {
      doc
        .text(c4, 270, y, { width: 90, align: 'right' })
        .text(c5, 360, y, { width: 90, align: 'right' });
    }

    doc
      .text(c6, 450, y, { align: 'right' })

    if (r2)
      doc.text(r2, 50, y + 15);
  }

  function generateInvoiceTable() {
    let i = 0;
    const invoiceTableTop  = 360;

    generateTableRow(
      invoiceTableTop,
      'Item',
      `${invoice.currency}/1`,
      'Quantity',
      `Tax Base ${invoice.currency}`,
      'VAT Rate',
      `Total ${invoice.currency}`,
      null
    );

    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      const position = invoiceTableTop + (i + 1) * 30;
      generateTableRow(
        position,
        `${i+1}. ${item.name}`,
        item.itemPrice,
        item.items,
        item.totalLine,
        item.vatRatePercent,
        item.totalLineToBePaid,
        item.description
      );
    }
  }

  function generateVatTable() {
    let i = 0;
    let invoiceTableTop  = 450  + invoice.items.length * 30;

    if (invoice.printRate) {
      generateTableRow(
        invoiceTableTop,
        '', '', '', '', '',
        `Currency Rate: 1 ${invoice.currency} = ${invoice.currencyMultiplyingRateToAccountingSchemeCurrency} ${invoice.accountingSchemeCurrency}`,
        null
      );
      invoiceTableTop += 15;
    }
    if (invoice.vatRegistered) {
      generateTableRow(
        invoiceTableTop,
        '', '', '', '', '',
        `Tax Base: ${invoice.totalLinesAccountingSchemeCurrency} ${invoice.accountingSchemeCurrency}`,
        null
      );
      invoiceTableTop += 15;
      for (i = 0; i < invoice.vatReport.length; i++) {
        const item = invoice.vatReport[i];
        const position = invoiceTableTop + i * 15;
        generateTableRow(
          position,
          '',
          ' ',
          '',
          '',
          '',
          `${item.vatRatePercent}% VAT: ${item.vatTotalAccountingSchemeCurrency} ${invoice.accountingSchemeCurrency}`,
          null,
        );
      }
      invoiceTableTop += 15 * invoice.vatReport.length;
    }
    doc
      .font('Cardo-Bold')
      .fontSize(20)
      .text(`To be paid: ${invoice.grandTotal} ${invoice.currency}`, 50, invoiceTableTop)
      .font('Cardo');
  }

  generateHeader();
  generateInvoiceTable();
  generateFooter();
  generateVatTable();

  return savePdfToFile(doc, path);
}

function savePdfToFile(pdf, fileName : string) : Promise<void> {
  return new Promise<void>((resolve, reject) => {

    // To determine when the PDF has finished being written successfully
    // we need to confirm the following 2 conditions:
    //
    //   1. The write stream has been closed
    //   2. PDFDocument.end() was called synchronously without an error being thrown

    let pendingStepCount = 2;

    const stepFinished = () => {
      if (--pendingStepCount === 0) {
        resolve();
      }
    };

    const writeStream = fs.createWriteStream(fileName);
    writeStream.on('close', stepFinished);
    pdf.pipe(writeStream);

    pdf.end();

    stepFinished();
  });
}

@Injectable()
export class ReportsService implements ReportsServiceModel {
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
      idNumber: organization.idNumber,
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
      registration: customer.idNumber,
      idNumber: customer.idNumber,
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
      console.log('*** FAIL', e);
      data.printError = '' + e;
    }
    return data;
  }

  async printInvoice(data: PrintSalesInvoice): Promise<string> {
    const template = '/assets/sales-invoice.html';

    const resultFile = `/tmp/invoice-${data.invoiceNumber}-${Date.now()}`;
    await createInvoice(`${resultFile}.pdf`, data);

    const content = fs.readFileSync(`${resultFile}.pdf`);
    return '\\x' + content.toString('hex');
    //return '';
  }

}

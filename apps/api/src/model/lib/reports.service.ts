import { Inject, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import {
  TranslationService,
  TranslationServiceKey,
} from './translation.service';
import {
  PrintSalesInvoice,
  PrintSalesInvoiceParty,
} from './print.sales.invoice';
import { SalesInvoiceModel } from './sales.invoice.model';
import { LanguageModel } from './language.model';
import * as _ from 'lodash';

const fs = require('fs');
const PDFDocument = require('pdfkit');

export const ReportsServiceKey = 'ReportsServiceKey';

async function createInvoice(path: string, invoice: PrintSalesInvoice) {
  const doc = new PDFDocument({ margin: 50 });
  const messages = invoice.messages;

  const fontPath = fs.existsSync('./assets/Cardo-Regular.ttf')
    ? './assets/'
    : './apps/api/src/assets/';

  doc.registerFont('Cardo', `${fontPath}Cardo-Regular.ttf`);
  doc.registerFont('Cardo-Bold', `${fontPath}Cardo-Bold.ttf`);

  function generateHeader() {
    doc
      .font('Cardo-Bold')
      .fillColor('#444444')
      .fontSize(18)
      .text(
        `${messages.invoice(invoice.vatRegistered)} ${invoice.invoiceNumber}`,
        20,
        57,
        { align: 'right' }
      )
      .font('Cardo')
      .fontSize(10);

    doc
      .font('Cardo')
      .text(`${messages.issuedOn}: ${invoice.issuedOnPrintable}`, 200, 87, {
        align: 'right',
      })
      .text(`${messages.dueDate}: ${invoice.dueDatePrintable}`, 200, 87 + 15, {
        align: 'right',
      })
      .text(
        `${messages.invoiceNumber}: ${invoice.invoiceNumber}`,
        200,
        87 + 2 * 15,
        { align: 'right' }
      );

    let line = 87 + 60;
    if (invoice.vatRegistered) {
      doc
        .font('Cardo')
        .text(
          `${messages.transactionDate}: ${invoice.transactionDatePrintable}`,
          200,
          87 + 3 * 15,
          { align: 'right' }
        );
      line += 15;
    }

    const seller = invoice.seller;
    const buyer = invoice.buyer;

    doc
      .font('Cardo-Bold')
      .text(`${messages.seller}:`, 20, line)
      .font('Cardo')
      .text(seller.name, 20, line + 15)
      .text(seller.road, 20, line + 2 * 15)
      .text(seller.zipCode + ' ' + invoice.seller.city, 20, line + 3 * 15)
      .text(seller.country, 20, line + 4 * 15)
      .text(invoice.sellerContact, 20, line + 5 * 15)
      .text(seller.registration, 20, line + 6 * 15)
      .text(`IČ: ${seller.idNumber}`, 20, line + 7 * 15)
      .text(
        seller.vatNumber && invoice.vatRegistered
          ? `DIČ: ${seller.vatNumber}`
          : '',
        20,
        line + 8 * 15
      )
      .text(`ČR Účet: ${invoice.payTo}`, 20, line + 9 * 15)
      .text(`IBAN: ${invoice.iban}`, 20, line + 10 * 15)
      .text(`SWIFT: ${invoice.swift}`, 20, line + 11 * 15)

      .font('Cardo-Bold')
      .text(`${messages.buyer}:`, 200, line, { align: 'right' })
      .font('Cardo')
      .text(buyer.name, 200, line + 15, { align: 'right' })
      .text(buyer.road, 200, line + 2 * 15, { align: 'right' })
      .text(buyer.zipCode + ' ' + buyer.city, 200, line + 3 * 15, {
        align: 'right',
      })
      .text(buyer.country, 200, line + 4 * 15, { align: 'right' })
      .text(invoice.buyerEmail, 200, line + 5 * 15, { align: 'right' })
      .text(`${messages.idNumber}: ${buyer.idNumber}`, 200, line + 6 * 15, {
        align: 'right',
      })
      .text(
        buyer.vatNumber && invoice.vatRegistered
          ? `${messages.vatNumber}: ${buyer.vatNumber}`
          : '',
        200,
        line + 7 * 15,
        { align: 'right' }
      )

      .moveDown();
  }

  function generateFooter() {
    doc
      .font('Cardo')
      .fontSize(5)
      .text(messages.invoiceFooter(invoice), 50, 700, {
        align: 'center',
        width: 500,
      });
  }

  function generateTableRow(y, c1, c2, c3, c4, c5, c6, r2) {
    doc
      .font('Cardo')
      .fontSize(10)
      .text(c1, 50, y)
      .text(c2, 150, y)
      .text(c3, 180, y, { width: 90, align: 'right' });

    if (invoice.vatRegistered && !invoice.reverseCharge) {
      doc
        .text(c4, 270, y, { width: 90, align: 'right' })
        .text(c5, 360, y, { width: 90, align: 'right' });
    }

    doc.text(c6, 430, y, { align: 'right' });

    if (r2) doc.text(r2, 50, y + 15);
  }

  function generateInvoiceTable() {
    let i;
    let invoiceTableTop = 360;

    generateTableRow(
      invoiceTableTop,
      `${messages.item}`,
      `${invoice.currency}/1`,
      `${messages.units}`,
      `Základ ${invoice.currency}`,
      'Sazba',
      `${messages.total} ${invoice.currency}`,
      null
    );

    let pageNumber = 0;

    for (i = 0; i < invoice.items.length; i++) {
      const item = invoice.items[i];
      if (i >= 11 * (pageNumber + 1)) {
        doc.addPage();
        pageNumber++;
        invoiceTableTop = 100;
      }
      const position = invoiceTableTop + (i + 1) * 30 - 11 * pageNumber * 30;

      generateTableRow(
        position,
        `${i + 1}. ${item.name}`,
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
    let invoiceTableTop =
      (invoice.items.length <= 11 ? 450 : 200) +
      (invoice.items.length % 11) * 30;

    if (invoice.printRate) {
      generateTableRow(
        invoiceTableTop,
        '',
        '',
        '',
        '',
        '',
        `Kurz: 1 ${invoice.currency} = ${invoice.currencyMultiplyingRateToAccountingSchemeCurrency} ${invoice.accountingSchemeCurrency}`,
        null
      );
      invoiceTableTop += 15;
    }
    if (invoice.vatRegistered && !invoice.reverseCharge) {
      generateTableRow(
        invoiceTableTop,
        '',
        '',
        '',
        '',
        '',
        `Základ daně: ${invoice.totalLinesAccountingSchemeCurrency} ${invoice.accountingSchemeCurrency}`,
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
          `${item.vatRatePercent}% DPH: ${item.vatTotalAccountingSchemeCurrency} ${invoice.accountingSchemeCurrency}`,
          null
        );
      }
      invoiceTableTop += 15 * invoice.vatReport.length;
    }
    if (invoice.reverseCharge) {
      generateTableRow(
        invoiceTableTop,
        `${messages.reverseCharge}`,
        '',
        '',
        '',
        '',
        '',
        null
      );
    }
    doc
      .font('Cardo-Bold')
      .fontSize(18)
      .text(
        `${messages.totalToBePaid}: ${invoice.grandTotal} ${invoice.currency}`,
        50,
        invoiceTableTop + 30
      )
      .font('Cardo');
  }

  generateHeader();
  generateInvoiceTable();
  generateFooter();
  generateVatTable();

  return savePdfToFile(doc, path);
}

function savePdfToFile(pdf, fileName: string): Promise<void> {
  return new Promise<void>((resolve) => {
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
export class ReportsService {
  constructor(
    @Inject(TranslationServiceKey)
    private readonly translationService: TranslationService
  ) {}

  async printSalesInvoice(data: SalesInvoiceModel, language: LanguageModel) {
    const organization = data.organization;
    const accountingScheme = organization.accountingScheme;
    const organizationLegalAddress = organization.legalAddress;
    const vatNumber = organization.vatNumber;
    const vatRegistered = !!vatNumber;
    const seller = {
      name: organization.legalName,
      road: organizationLegalAddress.line1,
      city: organizationLegalAddress.city,
      country: organizationLegalAddress.country.displayName,
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
      country: customerLegalAddress.country.displayName,
      vatNumber: customer.vatNumber,
      zipCode: customerLegalAddress.zipCode,
      registration: customer.idNumber,
      idNumber: customer.idNumber,
    };

    function dateToString(d: Date): string {
      return moment(d).format('DD.MM.YYYY');
    }

    const items = [];

    for (const line of data.lines) {
      const lineTaxPercent = (await line.lineTax).ratePercent;
      items.push({
        name: line.product.displayName,
        itemPrice: _.round(line.linePrice / line.quantity, 2),
        items: line.quantity,
        totalLine: line.linePrice,
        vatRatePercent: lineTaxPercent,
        totalLineToBePaid: _.round(
          line.linePrice * (1 + lineTaxPercent / 100),
          2
        ),
        description: line.narration,
      });
    }
    const bankAccount = await data.bankAccount;

    const converted = {
      messages: this.translationService.getMessages(language),
      transactionDatePrintable: dateToString(data.transactionDate),
      issuedOnPrintable: dateToString(data.issuedOn),
      dueDatePrintable: dateToString(data.dueDate),
      invoiceNumber: data.documentNo,
      payTo: bankAccount.bankAccountCustomerPrintableNumber,
      iban: bankAccount.iban,
      swift: bankAccount.swift,
      seller,
      buyer,
      items,
      totalLines: (+data.totalLines).toFixed(2),
      grandTotal: (+data.grandTotal).toFixed(2),
      currency: data.currency.displayName,
      currencyMultiplyingRateToAccountingSchemeCurrency: (+data.currencyMultiplyingRateToAccountingSchemeCurrency).toFixed(
        3
      ),
      accountingSchemeCurrency: accountingScheme
        ? accountingScheme.currency.displayName
        : '###',
      totalLinesAccountingSchemeCurrency: (+data.totalLinesAccountingSchemeCurrency).toFixed(
        2
      ),
      grandTotalAccountingSchemeCurrency: (+data.grandTotalAccountingSchemeCurrency).toFixed(
        2
      ),
      vatReport: (await data.vatReport).map((x) => ({
        vatRatePercent: (+x.vatRatePercent).toFixed(0),
        vatTotal: (+x.vatTotal).toFixed(2),
        vatTotalAccountingSchemeCurrency: (+x.vatTotalAccountingSchemeCurrencyRaw).toFixed(
          2
        ),
      })),
      printRate:
        data.currency.displayName !==
        (accountingScheme ? accountingScheme.currency.displayName : '###'),
      vatRegistered,
      buyerEmail: customer.invoicingEmail,
      sellerContact: organization.contact,
      reverseCharge: data.reverseCharge,
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
    const resultFile = `/tmp/invoice-${data.invoiceNumber}-${Date.now()}`;
    await createInvoice(`${resultFile}.pdf`, data);

    const content = fs.readFileSync(`${resultFile}.pdf`);
    return '\\x' + content.toString('hex');
    //return '';
  }
}

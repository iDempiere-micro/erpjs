import { SalesInvoiceModel } from './sales.invoice.model';
import { SalesInvoiceSaveArgsModel } from './sales.invoice.save.args.model';
import { EntityManager, Repository } from 'typeorm/index';
import {
  BankAccountService,
  BankAccountServiceKey,
} from './bank.account.service';
import { CustomerService, CustomerServiceKey } from './customer.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CurrencyService, CurrencyServiceKey } from './currency.service';
import { TaxService, TaxServiceKey } from './tax.service';
import { ReportsService, ReportsServiceKey } from './reports.service';
import { LanguagesService, LanguagesServiceKey } from './languages.service';
import {
  CurrencyRateService,
  CurrencyRateServiceKey,
} from './currency.rate.service';
import * as _ from 'lodash';
import { SalesInvoiceVatModel } from './sales.invoice.vat.model';
import {
  SalesInvoiceVatService,
  SalesInvoiceVatServiceKey,
} from './sales.invoice.vat.service';
import {
  DocumentNumberingService,
  DocumentNumberingServiceKey,
} from './document.numbering.service';
import { BaseEntityService } from './base.entity.service';
import {
  OrganizationService,
  OrganizationServiceKey,
} from './organization.service';
import { SalesInvoice, SalesInvoiceLine } from './entity.base';
import { getService } from './module.reference.service';
import { SalesInvoiceLineModel } from './sales.invoice.line.model';
import { SalesInvoiceLineSaveArgsModel } from './sales.invoice.line.save.args.model';
import { ProductService, ProductServiceKey } from './product.service';
import { OrganizationModel } from './organization.model';
import moment = require('moment');

export const SalesInvoiceServiceKey = 'SalesInvoiceService';

export const SalesInvoiceLineServiceKey = 'SalesInvoiceLineService';

type LineCalculatedTax = {
  vatRatePercent: number;
  vatTotal: number;
  vatTotalAccountingSchemeCurrency: number;
}

@Injectable()
export class SalesInvoiceLineService extends BaseEntityService<
  SalesInvoiceLineModel,
  SalesInvoiceLineSaveArgsModel
> {
  salesInvoiceService: SalesInvoiceService;

  createEntity(): SalesInvoiceLineModel {
    return new SalesInvoiceLine();
  }

  protected getRepository(
    transactionalEntityManager
  ): Repository<SalesInvoiceLineModel> {
    return transactionalEntityManager.getRepository(SalesInvoiceLine);
  }

  constructor(
    @Inject(TaxServiceKey) public readonly taxService: TaxService,
    @Inject(ProductServiceKey) public readonly productService: ProductService
  ) {
    super();
    this.salesInvoiceService = getService<SalesInvoiceService>(
      SalesInvoiceServiceKey
    );
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: SalesInvoiceLineSaveArgsModel,
    line: SalesInvoiceLineModel
  ): Promise<SalesInvoiceLineModel> {
    line.lineTax =
      args.lineTax ||
      (args.lineTaxIsStandard
        ? await this.taxService.getStandardTax(transactionalEntityManager)
        : await this.taxService.loadEntityById(
            transactionalEntityManager,
            args.lineTaxId
          ));
    line.product =
      args.product ||
      (args.productSku
        ? await this.productService.getProduct(
            transactionalEntityManager,
            args.productSku
          )
        : await this.productService.loadEntityById(
            transactionalEntityManager,
            args.productId
          ));
    line.lineOrder = args.lineOrder;

    const invoice =
      args.invoice ||
      (await this.salesInvoiceService.loadEntityById(
        transactionalEntityManager,
        args.invoiceId
      ));
    line.invoice = invoice;
    await invoice.customer;
    line.linePrice = args.linePrice;
    line.quantity = args.quantity;
    line.narration = args.narration;

    return line;
  }

  typeName(): string {
    return SalesInvoiceLineServiceKey;
  }
}

@Injectable()
export class SalesInvoiceService extends BaseEntityService<
  SalesInvoiceModel,
  SalesInvoiceSaveArgsModel
> {
  salesInvoiceLineService: SalesInvoiceLineService;

  constructor(
    @Inject(BankAccountServiceKey)
    protected readonly bankAccountService: BankAccountService,
    @Inject(CustomerServiceKey)
    protected readonly customerService: CustomerService,
    @Inject(OrganizationServiceKey)
    protected readonly organizationService: OrganizationService,
    @Inject(CurrencyServiceKey)
    protected readonly currencyService: CurrencyService,
    @Inject(TaxServiceKey) protected readonly taxService: TaxService,
    @Inject(ReportsServiceKey)
    protected readonly reportsServiceModel: ReportsService,
    @Inject(LanguagesServiceKey)
    protected readonly languagesService: LanguagesService,
    @Inject(CurrencyRateServiceKey)
    protected readonly currencyRateService: CurrencyRateService,
    @Inject(SalesInvoiceVatServiceKey)
    protected readonly salesInvoiceVatService: SalesInvoiceVatService,
    @Inject(ReportsServiceKey)
    protected readonly reportsService: ReportsService,
    @Inject(DocumentNumberingServiceKey)
    protected readonly documentNumberingServiceModel: DocumentNumberingService
  ) {
    super();
    this.salesInvoiceLineService = getService<SalesInvoiceLineService>(
      SalesInvoiceLineServiceKey
    );
  }

  createEntity(): SalesInvoiceModel {
    return new SalesInvoice();
  }

  protected async getOrganization(
    transactionalEntityManager: EntityManager,
    args: SalesInvoiceSaveArgsModel
  ): Promise<OrganizationModel> {
    return (
      (args.organization &&
        args.organization.legalAddress &&
        args.organization.legalAddress.country &&
        args.organization.bankAccount &&
        args.organization) ||
      (await this.organizationService.getOrg(
        transactionalEntityManager,
        args.organizationDisplayName || args.organization.displayName,
        [
          'legalAddress',
          'legalAddress.country',
          'bankAccount',
          'accountingScheme',
          'accountingScheme.currency',
        ]
      ))
    );
  }

  protected getRepository(
    transactionalEntityManager
  ): Repository<SalesInvoiceModel> {
    return transactionalEntityManager.getRepository(SalesInvoice);
  }
  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: SalesInvoiceSaveArgsModel,
    invoice: SalesInvoiceModel
  ): Promise<SalesInvoiceModel> {
    invoice.customer =
      (args.customer &&
        args.customer.legalAddress &&
        args.customer.legalAddress.country &&
        args.customer) ||
      (await this.customerService.getCustomer(
        transactionalEntityManager,
        args.customerDisplayName || args.customer.displayName,
        ['legalAddress', 'legalAddress.country']
      ));
    const organization = await this.getOrganization(
      transactionalEntityManager,
      args
    );
    invoice.organization = organization;
    invoice.bankAccount = organization.bankAccount;
    invoice.issuedOn = moment(args.issuedOn).startOf('day').toDate();
    invoice.dueDate = moment(
      new Date(+invoice.issuedOn + args.paymentTermInDays * 86400000)
    )
      .startOf('day')
      .toDate();
    invoice.grandTotal = 0;
    invoice.grandTotalAccountingSchemeCurrency = 0;
    invoice.totalLines = 0;
    invoice.totalLinesAccountingSchemeCurrency = 0;
    invoice.transactionDate = args.transactionDate;
    invoice.paymentTermInDays = args.paymentTermInDays;
    invoice.currency = args.currency
      ? args.currency
      : await this.currencyService.getCurrency(
          transactionalEntityManager,
          args.currencyIsoCode
        );
    invoice.currencyMultiplyingRateToAccountingSchemeCurrency = 0;
    invoice.isDraft = true;
    invoice.isCalculated = false;
    // TODO: implement also other reverse charge conditions
    // see e.g. https://europa.eu/youreurope/business/taxation/vat/cross-border-vat/index_en.htm
    // or https://www.uctovani.net/clanek.php?t=Preneseni-danove-povinnosti-neboli-reverse-charge&idc=217
    const customerCountry = invoice.customer.legalAddress.country;
    const supplierCountry = organization.legalAddress.country;
    invoice.reverseCharge =
      customerCountry.isEUMember &&
      supplierCountry.isEUMember &&
      customerCountry.isoCode !== supplierCountry.isoCode;

    // TODO: get better printLanguage implementation
    const languages = this.languagesService.getLanguages();
    const language =
      customerCountry.isoCode === supplierCountry.isoCode
        ? languages.find(
            (x) =>
              x.isoCode.toLowerCase() === customerCountry.isoCode.toLowerCase()
          )
        : languages.find(
            (x) =>
              x.isoCode.toLowerCase() ===
              `${supplierCountry.isoCode}-${customerCountry.isoCode}`.toLowerCase()
          );
    if (!language)
      throw new Error(
        `No language for ${supplierCountry.isoCode} -> ${customerCountry.isoCode}`
      );
    invoice.printLanguage = language;

    await this.persist(transactionalEntityManager, invoice);

    const vatRegistered = !!organization.vatNumber;

    let lineOrder = 10;
    const invoiceLines = [];
    for (const line1 of args.lines) {
      const line = await this.salesInvoiceLineService.save(
        transactionalEntityManager,
        {
          ...line1,
          product: line1.product,
          lineTax:
            vatRegistered && !invoice.reverseCharge
              ? line1.lineTax
              : await this.taxService.getZeroTax(transactionalEntityManager),
          invoice,
          lineOrder,
        }
      );
      lineOrder += 10;
      invoiceLines.push(line);
    }
    invoice.lines = invoiceLines;

    const result = await this.calculatePrices(
      transactionalEntityManager,
      invoice
    );

    await this.reportsServiceModel.printSalesInvoice(
      result,
      result.printLanguage
    );

    return result;
  }

  typeName(): string {
    return SalesInvoiceServiceKey;
  }

  async calculatePrices(
    transactionalEntityManager: EntityManager,
    invoiceWithLines: SalesInvoiceModel
  ): Promise<SalesInvoiceModel> {
    if (!invoiceWithLines) return invoiceWithLines;

    const currencyRate = await this.currencyRateService.getAccountingForDateAndOrg(
      transactionalEntityManager,
      invoiceWithLines.transactionDate,
      invoiceWithLines.currency,
      invoiceWithLines.organization
    );
    if (!currencyRate)
      throw new Error(
        `No currency rate for ${invoiceWithLines.currency.displayName} at ${invoiceWithLines.transactionDate}`
      );
    const currencyMultiplyingRateToAccountingSchemeCurrency: number =
      currencyRate.currencyMultiplyingRate;
    const lines = invoiceWithLines.lines;

    invoiceWithLines.totalLines = 0;
    invoiceWithLines.grandTotal = 0;
    const org = await invoiceWithLines.organization;
    const vatRegistered = !!org.vatNumber;
    const lineCalculatedTaxes = [];
    if (lines) {
      for (const line of lines) {
        if (vatRegistered && !line.lineTax)
          throw new Error('Vat registered and no line tax');

        // make sure we work with number, so do not use +=
        invoiceWithLines.totalLines =
          +invoiceWithLines.totalLines + line.linePrice;
        const lineTax = line.lineTax;
        const vatTotal = vatRegistered
          ? +line.linePrice * (+lineTax.ratePercent / 100)
          : 0;

        const lineCalculatedTax = {
          vatRatePercent: vatRegistered ? lineTax.ratePercent : 0,
          vatTotal,
          vatTotalAccountingSchemeCurrency:
            vatTotal * currencyMultiplyingRateToAccountingSchemeCurrency,
        };
        lineCalculatedTaxes.push(lineCalculatedTax);
        // make sure we work with number, so do not use +=
        invoiceWithLines.grandTotal =
          +invoiceWithLines.grandTotal +
          line.linePrice +
          lineCalculatedTax.vatTotal;
      }
    }
    const taxes = _.groupBy(lineCalculatedTaxes, (x) => x.vatRatePercent);
    const vatReport: SalesInvoiceVatModel[] = [];

    // remove the old invoiceWithLines.vatReport
    const oldVatReports = invoiceWithLines.vatReport;
    if (oldVatReports) {
      for (const oldVatReport of oldVatReports) {
        await this.salesInvoiceVatService.delete(
          transactionalEntityManager,
          oldVatReport
        );
      }
    }

    for (const [vatRatePercent, _toBeSummed] of Object.entries(taxes)) {
      const toBeSummed = _toBeSummed as LineCalculatedTax[];
      const vatTotal = _.sum(toBeSummed.map((x) => x.vatTotal));
      const vatTotalAccountingSchemeCurrency = _.sum(
        toBeSummed.map((x) => x.vatTotalAccountingSchemeCurrency)
      );
      vatReport.push(
        await this.salesInvoiceVatService.save(transactionalEntityManager, {
          vatRatePercent: +vatRatePercent,
          vatTotalRaw: vatTotal,
          vatTotal: _.round(vatTotal, 2),
          vatTotalAccountingSchemeCurrencyRaw: vatTotalAccountingSchemeCurrency,
          vatTotalAccountingSchemeCurrency: _.round(
            vatTotalAccountingSchemeCurrency,
            2
          ),
          invoice: invoiceWithLines,
        })
      );
    }

    invoiceWithLines.vatReport = vatReport;
    invoiceWithLines.totalLinesAccountingSchemeCurrency = _.round(
      invoiceWithLines.totalLines *
        currencyMultiplyingRateToAccountingSchemeCurrency,
      2
    );
    invoiceWithLines.totalLines = _.round(invoiceWithLines.totalLines, 2);
    invoiceWithLines.grandTotalAccountingSchemeCurrency = _.round(
      invoiceWithLines.grandTotal *
        currencyMultiplyingRateToAccountingSchemeCurrency,
      2
    );
    invoiceWithLines.grandTotal = _.round(invoiceWithLines.grandTotal, 2);

    invoiceWithLines.currencyMultiplyingRateToAccountingSchemeCurrency = currencyMultiplyingRateToAccountingSchemeCurrency;
    invoiceWithLines.isCalculated = true;

    return invoiceWithLines;
  }

  async confirm(
    manager: EntityManager,
    invoice: SalesInvoiceModel
  ): Promise<SalesInvoiceModel> {
    invoice.isDraft = false;
    await this.assignDocumentNumbersToInvoices(manager, [invoice]);
    await this.reportsServiceModel.printSalesInvoice(
      invoice,
      invoice.printLanguage
    );
    await this.persist(manager, invoice);
    return invoice;
  }

  async fixPrint(manager: EntityManager) {
    const invoices = await manager
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .select('invoice')
      .from(SalesInvoice, 'invoice')
      .where(`invoice.content is NULL`, {})
      .orderBy('id')
      .getMany();

    for (const invoice of invoices) {
      const printed = await this.reportsService.printSalesInvoice(
        invoice,
        invoice.printLanguage
      );
      await manager.save(printed);
    }
  }

  async assignDocumentNumbersToInvoices(
    manager: EntityManager,
    notDraftInvoicesWithoutDocumentNumber: Array<SalesInvoiceModel>
  ) {
    for (const invoice of notDraftInvoicesWithoutDocumentNumber) {
      if (invoice.documentNo || invoice.isDraft) {
        throw new Error(
          'Call with non draft invoices without document number only!'
        );
      }
      invoice.documentNo = await this.documentNumberingServiceModel.getNextDocumentNumber(
        manager,
        invoice.constructor,
        await invoice.organization
      );
    }
  }
}

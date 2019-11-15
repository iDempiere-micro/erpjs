import { BaseEntityServiceImplementation } from './base.entity.service';
import { SalesInvoiceVatSaveArgsModel } from '../args/sales.invoice.vat.save.args.model';
import { SalesInvoiceVatModel } from '../entities/sales.invoice.vat.model';

export const SalesInvoiceVatServiceKey = 'SalesInvoiceVatService';

export class SalesInvoiceVatService extends BaseEntityServiceImplementation<SalesInvoiceVatModel, SalesInvoiceVatSaveArgsModel>{
  protected async doSave(args: SalesInvoiceVatSaveArgsModel, salesInvoiceVatModel: SalesInvoiceVatModel): Promise<SalesInvoiceVatModel> {
    salesInvoiceVatModel.vatTotal = args.vatTotal;
    salesInvoiceVatModel.vatTotalAccountingSchemeCurrency = args.vatTotalAccountingSchemeCurrency;
    salesInvoiceVatModel.vatRatePercent = args.vatRatePercent;
    salesInvoiceVatModel.vatTotalAccountingSchemeCurrencyRaw = args.vatTotalAccountingSchemeCurrencyRaw;
    salesInvoiceVatModel.vatTotalRaw = args.vatTotalRaw;
    salesInvoiceVatModel.displayName = '';
    salesInvoiceVatModel.invoice = Promise.resolve(args.invoice);
    return salesInvoiceVatModel;
  }

  typeName(): string {
    return SalesInvoiceVatServiceKey;
  }

}

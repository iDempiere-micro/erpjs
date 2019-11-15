import { Constructor, BaseService, Model } from './base.service';
import { ProductQuantityPriceTaxModel } from '../helpers/product.quantity.price.tax.model';
import { SalesInvoiceLineSaveArgsModel } from '../args/sales.invoice.line.save.args.model';
import { BaseModel } from '../entities/base.model';
import { SalesInvoiceModel } from '../entities/sales.invoice.model';
import { BaseEntityServiceImplementation } from './base.entity.service';

export const SalesInvoiceLineServiceKey = 'SalesInvoiceLineService';

export interface SalesInvoiceLineModel
  extends ProductQuantityPriceTaxModel, BaseModel {
  lineOrder: number;
  invoice: Promise<SalesInvoiceModel>;
}

export class SalesInvoiceLineService extends BaseEntityServiceImplementation<SalesInvoiceLineModel, SalesInvoiceLineSaveArgsModel> {
  protected async doSave(args: SalesInvoiceLineSaveArgsModel, line: SalesInvoiceLineModel): Promise<SalesInvoiceLineModel> {
    line.lineTax = Promise.resolve(args.lineTax);
    line.product = Promise.resolve(args.product);
    line.lineOrder = args.lineOrder;
    line.linePrice = args.linePrice;
    line.quantity = args.quantity;
    line.invoice = Promise.resolve(args.invoice);
    line.narration = args.narration;

    return line;
  }

  typeName(): string {
    return SalesInvoiceLineServiceKey;
  }

}

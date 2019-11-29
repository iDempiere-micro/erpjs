import { ProductQuantityPriceTaxModel } from '../helpers/product.quantity.price.tax.model';
import { BaseModel } from '../entities/base.model';
import { RecurringSalesInvoiceModel } from '../entities/recurring.sales.invoice.model';
import { BaseEntityServiceImplementation } from './base.entity.service';
import { RecurringSalesInvoiceLineSaveArgsModel } from '../args/recurring.sales.invoice.line.save.args.model';

export const RecurringSalesInvoiceLineServiceKey = 'RecurringSalesInvoiceLineService';

export interface RecurringSalesInvoiceLineModel
  extends ProductQuantityPriceTaxModel, BaseModel {
  invoice: Promise<RecurringSalesInvoiceModel>;
  lineOrder: number;
}

export class RecurringSalesInvoiceLineService
  extends BaseEntityServiceImplementation<RecurringSalesInvoiceLineModel, RecurringSalesInvoiceLineSaveArgsModel> {
  protected async doSave(
    args: RecurringSalesInvoiceLineSaveArgsModel,
    line: RecurringSalesInvoiceLineModel): Promise<RecurringSalesInvoiceLineModel> {
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
    return RecurringSalesInvoiceLineServiceKey;
  }

}

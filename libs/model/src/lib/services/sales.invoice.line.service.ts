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
    const {taxService, productService, salesInvoiceService} = this.getInjector();
    line.lineTax =
      Promise.resolve(
        args.lineTax ? args.lineTax : await taxService.loadEntity(args.lineTaxId)
      );
    line.product =
      Promise.resolve(
        args.product ? args.product : await productService.loadEntity(args.productId)
      );
    line.lineOrder = args.lineOrder;
    line.linePrice = args.linePrice;
    line.quantity = args.quantity;
    line.invoice =
      Promise.resolve(
        args.invoice ? args.invoice : await salesInvoiceService.loadEntity(args.invoiceId)
      );
    line.narration = args.narration;

    return line;
  }

  typeName(): string {
    return SalesInvoiceLineServiceKey;
  }

}

import { ProductQuantityPriceTaxModel } from '../helpers/product.quantity.price.tax.model';
import { SalesInvoiceLineSaveArgsModel } from '../args/sales.invoice.line.save.args.model';
import { BaseModel } from '../entities/base.model';
import { SalesInvoiceModel } from '../entities/sales.invoice.model';
import { BaseEntityServiceImplementation } from './base.entity.service';
import { CustomerProductPriceModel } from '../entities/customer.product.price.model';

const { map, find } = require('p-iteration');

export const SalesInvoiceLineServiceKey = 'SalesInvoiceLineService';

export interface SalesInvoiceLineModel
  extends ProductQuantityPriceTaxModel, BaseModel {
  lineOrder: number;
  invoice: Promise<SalesInvoiceModel>;
}

export class SalesInvoiceLineService extends BaseEntityServiceImplementation<SalesInvoiceLineModel, SalesInvoiceLineSaveArgsModel> {
  protected async doSave(args: SalesInvoiceLineSaveArgsModel, line: SalesInvoiceLineModel): Promise<SalesInvoiceLineModel> {
    const {taxService, productService, salesInvoiceService, customerGroupService, customerPriceListService} = this.getInjector();
    line.lineTax =
      Promise.resolve(
        args.lineTax ? args.lineTax : await taxService.loadEntity(args.lineTaxId)
      );
    const product = args.product ? args.product : await productService.loadEntity(args.productId);
    line.product = Promise.resolve(product);
    line.lineOrder = args.lineOrder;

    const invoice = args.invoice ? args.invoice : await salesInvoiceService.loadEntity(args.invoiceId);
    line.invoice = Promise.resolve(invoice);

    const customer = await invoice.customer;
    const customerGroup = await customerGroupService.findCustomerGroup(customer);
    const customerPriceListModel =
      customerGroup ? await customerPriceListService.loadByCustomerGroupAndProduct(customerGroup, product) : null;
    const customerProductPriceModel : CustomerProductPriceModel =
      customerPriceListModel ?
      await find(
        await customerPriceListModel.productPrices,
        async (x: CustomerProductPriceModel) => (await x.product).id === (await line.product).id
      ) : null;

    line.linePrice =
      customerProductPriceModel ? customerProductPriceModel.sellingPrice * args.quantity :
      args.linePrice;
    line.quantity = args.quantity;
    line.narration = args.narration;

    return line;
  }

  typeName(): string {
    return SalesInvoiceLineServiceKey;
  }

}

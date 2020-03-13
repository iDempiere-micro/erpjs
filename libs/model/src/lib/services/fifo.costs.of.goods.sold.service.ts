/**
 * Service to calculate costs of goods sold using FIFO.
 */
import { ProductQuantityModel } from '../helpers/product.quantity.model';
import { WarehouseModel } from '../entities/warehouse.model';
import { ProductReceiptLineModel } from '../entities/product.receipt.line.model';

export const FifoCostsOfGoodsSoldServiceKey = 'FifoCostsOfGoodsSoldService';

const { filter } = require('p-iteration');

export interface FifoCostsOfGoodsSoldCalculationResult {
  costsOfGoodsSold: number;
  receiptLinesModified: Array<ProductReceiptLineModel>;
}

export class FifoCostsOfGoodsSoldService {
  async calculateFifoCostsOfGoodsSold(
    of: ProductQuantityModel,
    basedOn: Array<ProductReceiptLineModel>,
    warehouse: WarehouseModel
  ):
    Promise<FifoCostsOfGoodsSoldCalculationResult> {
    if (!of || !warehouse || !basedOn || basedOn.length === 0) {
      return { costsOfGoodsSold: undefined, receiptLinesModified: [] };
    }

    async function onlyValid(x: ProductReceiptLineModel): Promise<boolean> {
      const x_warehouse = await(await x.productReceipt).warehouse;
      return x.quantityOnHand && x.quantityOnHand > 0 && x_warehouse
        && x_warehouse.id === warehouse.id
    }

    const receiptLinesSortedByReceiptDate =
      (await filter(basedOn, async x => await onlyValid(x)))
        .sort((x, y) => x.movementDate - y.movementDate);

    const receiptLinesModified = [];
    let quantityRemaining = of.quantity;
    let costsOfGoodsSold = 0;
    for (const receiptLine of receiptLinesSortedByReceiptDate) {
      if (quantityRemaining >= receiptLine.quantityOnHand) {
        costsOfGoodsSold += receiptLine.linePrice;
        quantityRemaining -= receiptLine.quantityOnHand;
        receiptLine.quantityOnHand = 0;
        receiptLinesModified.push(receiptLine);
      } else {
        costsOfGoodsSold += quantityRemaining * receiptLine.linePrice / receiptLine.quantity;
        receiptLine.quantityOnHand -= quantityRemaining;
        quantityRemaining = 0;
        receiptLinesModified.push(receiptLine);
        break;
      }
    }
    return { costsOfGoodsSold, receiptLinesModified };
  }
}

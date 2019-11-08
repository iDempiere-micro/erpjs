/**
 * Service to calculate costs of goods sold using FIFO.
 */
import { ProductQuantityModel, ReceiptLineModel, WarehouseModel } from '../..';

export interface FifoCostsOfGoodsSoldCalculationResult {
  costsOfGoodsSold: number;
  receiptLinesModified: Array<ReceiptLineModel>;
}

export class FifoCostsOfGoodsSoldService {
  async calculateFifoCostsOfGoodsSold(
    of: ProductQuantityModel,
    basedOn: Array<ReceiptLineModel>,
    warehouse: WarehouseModel
  ):
    Promise<FifoCostsOfGoodsSoldCalculationResult> {
      if (!of || !warehouse || !basedOn || basedOn.length === 0) {
        return { costsOfGoodsSold: undefined, receiptLinesModified:[] };
      }

    const receiptLinesSortedByReceiptDate = basedOn
        .filter( x => x.quantityOnHand && x.quantityOnHand > 0 && x.warehouse
        && x.warehouse.id === warehouse.id)
        // @ts-ignore
        .sort( (x,y) => x.receiptDate - y.receiptDate );

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
    return { costsOfGoodsSold, receiptLinesModified};
  }
}

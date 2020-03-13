import { Test } from '@nestjs/testing';
import { sum } from '../../util';
import { FifoCostsOfGoodsSoldService } from './fifo.costs.of.goods.sold.service';
import { CountryModel } from '../entities/country.model';
import { ProductModel } from '../entities/product.model';
import { ProductMovementDirection, ProductReceiptLineModel } from '@erpjs/model';

describe('FifoCostsOfGoodsSoldService', () => {
  let service: FifoCostsOfGoodsSoldService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [FifoCostsOfGoodsSoldService]
    }).compile();

    service = app.get<FifoCostsOfGoodsSoldService>(FifoCostsOfGoodsSoldService);
  });

  describe('FifoCostsOfGoodsSoldService', () => {
    it('calculateFifoCostsOfGoodsSold empty return empty', async () => {
      const test = await service.calculateFifoCostsOfGoodsSold(null, [], null);
      expect(test.costsOfGoodsSold).toBeUndefined();
      expect(test.receiptLinesModified.length).toEqual(0);
    });
    it('calculateFifoCostsOfGoodsSold sample returns 1300', async () => {
      // see https://www.investopedia.com/ask/answers/111714/how-do-i-calculate-cost-goods-sold-cogs-using-first-first-out-fifo-method.asp
      // for the sample
      const country: Promise<CountryModel> = Promise.resolve({ id: 1, displayName: 'C', isoCode: 'ABC', isEUMember: false });
      const warehouse =
        Promise.resolve({
          id:1,
          displayName: 'WH',
          address: Promise.resolve({ id:1, displayName: 'a', country, city: null, zipCode: null, line1: null }),
        });
      const productReceipt = Promise.resolve({warehouse} as any);
      const product: Promise<ProductModel> =
        Promise.resolve({ id: 1, sku: 'aaaa', displayName: 'A' });
      const receipts : Array<ProductReceiptLineModel> =
      [
        {id:3, quantityOnHand: 100, movementDate: new Date( 2019,8-1,15), displayName: 'last',
          product, quantity: 100, linePrice: 600, lineTax: null, narration: null, moveDirection: ProductMovementDirection.receipt,productReceipt,},
        {id:1, quantityOnHand: 100, movementDate: new Date( 2019,8-1,1), displayName: 'initial',
        product, quantity: 100, linePrice: 500, lineTax: null, narration: null, moveDirection: ProductMovementDirection.receipt,
        productReceipt,
      },
        {id:2, quantityOnHand: 100, movementDate: new Date( 2019,8-1,10), displayName: 'first',
          product, quantity: 100, linePrice: 500, lineTax: null, narration: null, moveDirection: ProductMovementDirection.receipt, productReceipt,},
      ];
      const test =
        await service.calculateFifoCostsOfGoodsSold(
          { product, quantity: 250 },
          receipts,
          await warehouse
        );
      expect(test.costsOfGoodsSold).toBe(1300);
      expect(test.receiptLinesModified.length).toEqual(3);
      const newOnHand = sum(test.receiptLinesModified.map( x => x.quantityOnHand ));
      expect(newOnHand).toBe(100+100+100-250);
    });
  });
});

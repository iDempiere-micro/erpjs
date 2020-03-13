import { ProductReceiptLineService } from '@erpjs/model';
import { Test } from '@nestjs/testing';

const product = {} as any;
const productReceipt = {} as any;

describe('ProductReceiptLineService', () => {
  let service: ProductReceiptLineService;
  const dummy = {} as any;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ProductReceiptLineService]
    }).compile();

    service = app.get<ProductReceiptLineService>(ProductReceiptLineService);
    service.createEntity = () => Promise.resolve(dummy);
  });

  describe('ProductReceiptLineService', () => {

      it('save empty return empty', async () => {
        const args = {
          productReceipt,
          product,
          movementDate: new Date(),
          quantity: 0,
          linePrice: 0,
          lineTax: null,
        };
        const test = await service.save(args);
        expect(test.quantity).toEqual(0);
      });
    }
  );
});

import {
  ProductModel,
  ProductQuantityOnHandService,
  ProductReceiptLineService,
  ProductReceiptService, WarehouseModel
} from '@erpjs/model';
import { Test } from '@nestjs/testing';

const product = {} as any;
const quantity = {
  product,
  quantity: 0,
  warehouse: null,
  id: -1,
  displayName: '',
};

describe('ProductReceiptService', () => {
  let service: ProductReceiptService;
  const dummy = {} as any;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ProductReceiptService, ProductReceiptLineService, ProductQuantityOnHandService]
    }).compile();

    service = app.get<ProductReceiptService>(ProductReceiptService);
    service.createEntity = () => Promise.resolve(dummy);
    service.persist = async (x) => {};
    const productReceiptLineService = app.get<ProductReceiptLineService>(ProductReceiptLineService);
    productReceiptLineService.createEntity = () => Promise.resolve(dummy);
    const productQuantityOnHandService = app.get<ProductQuantityOnHandService>(ProductQuantityOnHandService);
    productQuantityOnHandService.loadByProductAndWarehouse = async (product1, warehouse) => quantity;
    productQuantityOnHandService.createEntity = () => Promise.resolve(dummy);
    productQuantityOnHandService.createAndSaveHistoryRecord = async () => {};
    const injector = { productReceiptLineService, productQuantityOnHandService } as any;
    service.getInjector = () => injector;
  });

  describe('ProductReceiptService', () => {

      it('receive 1, confirm, gets 1 on hand', async () => {
        const args = {
          movementDate: new Date(),
          warehouse: null,
          lines:[
            {
              product,
              quantity: 1,
              linePrice: 0,
              lineTax: null,
            }
          ]
        };
        const test = await service.save(args);
        expect((await test.lines).map(x => x.quantity).reduce((a,b)=>a+b)).toEqual(1);
        await service.confirm(test);
        const  { productQuantityOnHandService } = service.getInjector();
        const q_on_hand = await productQuantityOnHandService.loadByProductAndWarehouse(product, null);
        expect(q_on_hand.quantity).toBe(1);
      });
    }
  );
});

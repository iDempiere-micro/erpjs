import {
  ProductModel,
  ProductQuantityOnHandService,
  ProductReceiptLineService,
  ProductIssueService,
  WarehouseModel,
  ProductReceiptService,
  ProductIssueLineService,
  FifoCostsOfGoodsSoldService,
  ProductReceiptLineModel, ProductReceiptLineSaveArgsModel
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
const customerOrder = {} as any;
let productReceiptLines : ProductReceiptLineModel[] = [];

describe('ProductIssueService', () => {
  let service: ProductIssueService;
  const dummy = {} as any;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        ProductIssueService,
        ProductIssueLineService,
        ProductReceiptLineService,
        ProductQuantityOnHandService,
        ProductReceiptService,
        FifoCostsOfGoodsSoldService,
      ]
    }).compile();

    service = app.get<ProductIssueService>(ProductIssueService);
    service.createEntity = () => Promise.resolve(dummy);
    service.persist = async (x) => {};
    const productReceiptLineService = app.get<ProductReceiptLineService>(ProductReceiptLineService);
    productReceiptLineService.createEntity = () => Promise.resolve(dummy);
    productReceiptLineService.loadEntity = async (id: number) => productReceiptLines.find( x => x.id === id);
    productReceiptLineService.loadEntities = async () => productReceiptLines;
    productReceiptLineService.save = async (args: ProductReceiptLineSaveArgsModel) => {
      const entity =
        args.id ? await productReceiptLineService.loadEntity(args.id) : await productReceiptLineService.createEntity();
      // @ts-ignore
      const result = await productReceiptLineService.doSave(args, entity);
      productReceiptLines = productReceiptLines.filter(x => x.id !== result.id);
      productReceiptLines.push(result);
      return result;
    };
    const productQuantityOnHandService = app.get<ProductQuantityOnHandService>(ProductQuantityOnHandService);
    productQuantityOnHandService.loadByProductAndWarehouse = async (product1, warehouse) => quantity;
    productQuantityOnHandService.createEntity = () => Promise.resolve(dummy);
    productQuantityOnHandService.createAndSaveHistoryRecord = async () => {};
    const productReceiptService = app.get<ProductReceiptService>(ProductReceiptService);
    productReceiptService.createEntity = () => Promise.resolve(dummy);
    productReceiptService.getInjector = () => injector;
    productReceiptService.persist = (x) => Promise.resolve();
    const productIssueLineService = app.get<ProductIssueLineService>(ProductIssueLineService);
    productIssueLineService.createEntity = () => Promise.resolve(dummy);
    productIssueLineService.persist = () => Promise.resolve();
    const fifoCostsOfGoodsSoldService = app.get<FifoCostsOfGoodsSoldService>(FifoCostsOfGoodsSoldService);
    const injector = {
      productReceiptLineService, productQuantityOnHandService, productReceiptService, productIssueLineService,
      fifoCostsOfGoodsSoldService,} as any;
    service.getInjector = () => injector;
  });

  describe('ProductIssueService', () => {
      it('receive 10, confirm, issue 1, confirm, gets 9 on hand', async () => {
        const { productQuantityOnHandService, productReceiptService } = service.getInjector();

        const args = {
          movementDate: new Date(),
          warehouse: null,
          lines:[
            {
              product,
              quantity: 10,
              linePrice: 10,
              lineTax: null,
            }
          ]
        };
        const test = await productReceiptService.save(args);
        await productReceiptService.confirm(test);

        const issued = await service.save(
          {
            movementDate: new Date(),
            warehouse: null,
            lines:[
              {
                product,
                quantity: 1,
              },
            ],
            customerOrder,
          }
        );
        await service.confirm(issued);

        const q_on_hand = await productQuantityOnHandService.loadByProductAndWarehouse(product, null);
        expect(q_on_hand.quantity).toBe(9);
      });
    }
  );
});

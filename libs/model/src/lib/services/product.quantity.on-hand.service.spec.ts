import { Test } from '@nestjs/testing';
import { ProductQuantityOnHandService } from './product.quantity.on-hand.service';
import { ProductQuantityOnHandHistoryModel } from '../entities/product.quantity.on-hand.history.model';
import { ProductMovementDirection } from '../helpers/product.movement.model';

const product = {sku:null} as any;
const warehouse = Promise.resolve(null);
const dummy = {
  id: -1,
  displayName: '',
  product: Promise.resolve(product),
  quantity: 0,
  warehouse,
};

describe('ProductQuantityOnHandService', () => {
  let service: ProductQuantityOnHandService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ProductQuantityOnHandService]
    }).compile();

    service = app.get<ProductQuantityOnHandService>(ProductQuantityOnHandService);
    service.createAndSaveHistoryRecord = (historyModel: ProductQuantityOnHandHistoryModel) => Promise.resolve();
    service.createEntity = () => Promise.resolve(dummy);
    service.loadByProductAndWarehouse = (_product) => Promise.resolve(dummy);
  });

  describe('ProductQuantityOnHandService', () => {

    it('postToGeneralLedger empty return empty', async () => {
      const args = {
        productMovement: {
          warehouse,
          product: Promise.resolve(product),
          quantity: 0,
          moveDirection: ProductMovementDirection.receipt,
          movementDate: new Date(),
        }
      };
      const test = await service.save(args);
      expect(test.quantity).toEqual(0);
    });

    it('postToGeneralLedger add', async () => {
      const oldLoadByProduct = service.loadByProductAndWarehouse;
      const oldState = {
        id: -1,
        displayName: '',
        product: Promise.resolve(product),
        quantity: 10,
        warehouse,

      };
      service.loadByProductAndWarehouse = (_product) => Promise.resolve(oldState);

      const args = {
        productMovement: {
          warehouse,
          product: Promise.resolve(product),
          quantity: 20,
          moveDirection: ProductMovementDirection.receipt,
          movementDate: new Date(),
        }
      };
      const test = await service.save(args);
      expect(test.quantity).toEqual(30);
      service.loadByProductAndWarehouse = oldLoadByProduct;
    });

    it('postToGeneralLedger remove', async () => {
      const oldLoadByProduct = service.loadByProductAndWarehouse;
      const oldState = {
        id: -1,
        displayName: '',
        product: Promise.resolve(product),
        quantity: 20,
        warehouse,
      };
      service.loadByProductAndWarehouse = (_product) => Promise.resolve(oldState);

      const args = {
        productMovement: {
          warehouse,
          product: Promise.resolve(product),
          quantity: 19,
          moveDirection: ProductMovementDirection.issue,
          movementDate: new Date(),
        }
      };
      const test = await service.save(args);
      expect(test.quantity).toEqual(1);
      service.loadByProductAndWarehouse = oldLoadByProduct;
    });

  });

});

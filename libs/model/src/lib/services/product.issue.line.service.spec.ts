import { ProductIssueLineService } from '@erpjs/model';
import { Test } from '@nestjs/testing';

const product = {} as any;
const productIssue = {} as any;

describe('ProductIssueLineService', () => {
  let service: ProductIssueLineService;
  const dummy = {} as any;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [ProductIssueLineService]
    }).compile();

    service = app.get<ProductIssueLineService>(ProductIssueLineService);
    service.createEntity = () => Promise.resolve(dummy);
  });

  describe('ProductIssueLineService', () => {

      it('save empty return empty', async () => {
        const args = {
          productIssue,
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

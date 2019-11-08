import { Test } from '@nestjs/testing';

import { AppService } from './app.service';
import { ModelConfiguration } from '@erpjs/model';
import { NullPricingService } from './null.pricing.service';

const mockSomeService = {
  calcOrderPriceTotal: () => ''
};

export const mockedProviders = [
  { provide: 'ModelConfiguration', useValue: mockSomeService },
  { provide: 'OrderService', useValue: mockSomeService },
  { provide: NullPricingService, useValue: mockSomeService },
];

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService, ...mockedProviders]
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to api!:"', async () => {
      expect(await service.getData()).toEqual({ message: 'Welcome to api!:' });
    });
  });
});

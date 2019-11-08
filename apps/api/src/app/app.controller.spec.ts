import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { mockedProviders } from './app.service.spec';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ...mockedProviders]
    }).compile();
  });

  describe('getData', () => {
    it('should return "Welcome to api!:"', async () => {
      const appController = app.get<AppController>(AppController);
      expect(await appController.getHello()).toEqual({ message: 'Welcome to api!:' });
    });
  });
});

import { Test } from '@nestjs/testing';
import { XmlService } from './xml.service';

describe('XmlService', () => {
  let service: XmlService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [XmlService],
    }).compile();

    service = app.get<XmlService>(XmlService);
  });

  describe('XmlService', () => {
    it('works for null', async () => {
      service.test();
    });
  });
});

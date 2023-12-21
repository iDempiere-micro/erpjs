import { Injectable } from '@nestjs/common';
import { xml } from 'xml-serializer-ts';
import { Hobby, Person } from './xml.service.mock';
import { CrossIndustryInvoiceType } from '../../../../../libs/ZUGFeRD-Factur-X/generated';
import { CrossIndustryInvoiceTypeRoot } from './xml.service.types';

export const XmlServiceKey = 'XmlService';

@Injectable()
export class XmlService {
  test = (): string => {
    const hobbies = [
      new Hobby('reading', 'loves to read books, magazines and web articles'),
      new Hobby('listening to Music', 'loves to listen to rock music'),
      new Hobby('travelling', 'loves to travel around the world'),
    ];
    const pets = ['dog', 'cat'];
    const bob = new Person('Bob', 'Mad', 29, hobbies, pets);

    return xml.serialize(bob);
  };

  generateCrossIndustryDocument = (i: CrossIndustryInvoiceType): string => {
    const result = new CrossIndustryInvoiceTypeRoot(i);
    return xml.serialize(result);
  };
}

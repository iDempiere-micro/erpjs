import { Injectable } from '@nestjs/common';
import { TranslationService } from '@erpjs/model';
import { messages } from '../messages/messages';

@Injectable()
export class TranslationServiceImplementation extends TranslationService {
  constructor() {
    super();
    this.getMessages = (language) => {
      return messages[ language.isoCode ];
    }
  }
}

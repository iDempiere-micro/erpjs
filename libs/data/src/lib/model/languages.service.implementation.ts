import { Injectable } from '@nestjs/common';
import { LanguagesService } from '@erpjs/model';
import { languages } from '@erpjs/data';

@Injectable()
export class LanguagesServiceImplementation extends LanguagesService {
  constructor() {
    super();
    this.getLanguages = () => languages;
  }
}

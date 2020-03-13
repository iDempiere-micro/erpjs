import { LanguageModel } from '../entities/language.model';

export const LanguagesServiceKey = 'LanguagesService';

export class LanguagesService {
  getLanguages: () => Array<LanguageModel>
}

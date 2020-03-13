import { LocalizedMessages } from '../helpers/localized.messages';
import { LanguageModel } from '../entities/language.model';

export const TranslationServiceKey = 'TranslationService';

export class TranslationService {
  getMessages: (language: LanguageModel) => LocalizedMessages
}

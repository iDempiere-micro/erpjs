import { LanguageModel } from '../entities/language.model';

export interface WasPrinted {
  printed: boolean;
  printDate?: Date;
  printError?: string;
  content?: string;
  printLanguage: LanguageModel;
}

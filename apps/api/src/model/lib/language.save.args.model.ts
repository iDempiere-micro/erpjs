import { BaseSaveArgsModel } from './base.save.args.model';

export interface LanguageSaveArgsModel extends BaseSaveArgsModel {
  isoCode: string;
  displayName: string;
}

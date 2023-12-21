import { BaseSaveArgsModel } from './base.save.args.model';

export interface CountrySaveArgsModel extends BaseSaveArgsModel {
  isoCode: string;
  displayName: string;
}

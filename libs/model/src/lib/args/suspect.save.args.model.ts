import { BaseSaveArgsModel } from './base.save.args.model';

export interface SuspectSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  description: string;
  url: string;
}

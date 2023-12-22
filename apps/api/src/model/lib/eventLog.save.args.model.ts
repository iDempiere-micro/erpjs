import { BaseSaveArgsModel } from './base.save.args.model';

export interface EventLogSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  content: any;
}

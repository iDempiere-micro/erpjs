import { BaseSaveArgsModel } from './base.save.args.model';
import { SuspectModel } from '../entities/suspect.model';

export interface ProspectSaveArgsModel extends BaseSaveArgsModel {
  displayName: string;
  problem: string;
  actionTaken: string;
  url: string;
  originated?: SuspectModel;
  originatedSuspectId?: number;
}

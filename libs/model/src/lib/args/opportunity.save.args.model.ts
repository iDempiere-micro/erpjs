import { LeadSaveArgsModel } from './lead.save.args.model';

export interface OpportunitySaveArgsModel extends LeadSaveArgsModel {
  closingDate: Date;
}

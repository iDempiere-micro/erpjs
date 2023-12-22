import { BaseSaveArgsModel } from './base.save.args.model';

export interface ContactPersonSaveArgsModel extends BaseSaveArgsModel {
  firstName: string;
  lastName: string;
}

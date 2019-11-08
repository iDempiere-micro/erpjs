import { BaseSaveArgsModel } from './base.save.args.model';
import { AddressSaveArgsModel } from './address.save.args.model';

export interface OrganizationSaveArgsModel extends  BaseSaveArgsModel {
  displayName : string;
  legalName : string;
  legalAddress: AddressSaveArgsModel;
  bankAccountId : number;
  accountingSchemeId : number;
  registration : string;
  contact : string;
}

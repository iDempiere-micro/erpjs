import { BaseSaveArgsModel } from './base.save.args.model';
import { AddressSaveArgsModel } from './address.save.args.model';
import { AccountingSchemeModel } from '../entities/accounting.scheme.model';

export interface OrganizationSaveArgsModel extends  BaseSaveArgsModel {
  displayName : string;
  legalName : string;
  legalAddress: AddressSaveArgsModel;
  bankAccountId : number;
  accountingSchemeId? : number;
  accountingScheme? : AccountingSchemeModel;
  registration : string;
  contact : string;
  idNumber: string;

}

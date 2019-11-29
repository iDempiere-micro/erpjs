import { AddressSaveArgsModel } from './address.save.args.model';
import { BaseSaveArgsModel } from './base.save.args.model';

export interface CustomerSaveArgsModel extends BaseSaveArgsModel {
  displayName?: string;
  legalName: string;

  vatNumber?: string;

  legalAddress: AddressSaveArgsModel;

  invoicingEmail: string;

  idNumber: string;
}

import { BaseSaveArgsModel } from './base.save.args.model';

export interface FactoringContractSaveArgsModel extends BaseSaveArgsModel {
  factoringProviderId: number;
  customerId: number;
  organizationId: number;
  invoicePrintNote: string;
}

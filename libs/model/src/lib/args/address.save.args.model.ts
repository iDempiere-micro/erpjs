import { BaseSaveArgsModel } from './base.save.args.model';

export interface AddressSaveArgsModel extends BaseSaveArgsModel{
  city: string;
  line1: string;
  zipCode: string;
  countryId: number;
}

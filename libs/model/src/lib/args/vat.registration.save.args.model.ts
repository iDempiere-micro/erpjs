import { BaseSaveArgsModel } from './base.save.args.model';

export interface VatRegistrationSaveArgsModel extends BaseSaveArgsModel {
  registeredForOrganizationId : number;
  registeredInCountryId : number;
  start: Date;
  end? : Date;
  vatNumber : string;
}

import { BaseSaveArgsModel } from './base.save.args.model';

export interface VatRegistrationSaveArgsModel extends BaseSaveArgsModel {
  registeredForOrganizationId : number;
  registeredInCountryIso : string;
  start: Date;
  end? : Date;
  vatNumber : string;
}

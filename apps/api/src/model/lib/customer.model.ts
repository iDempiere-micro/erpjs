import { AddressModel } from './address.model';
import { BaseModel } from './base.model';
import { ContactPersonCompanyRelationModel } from './contact.person.company.relation.model';
import { CustomerGroupModel } from './customer.group.model';

export interface CustomerModel extends BaseModel {
  legalAddress: AddressModel;
  legalName: string;
  vatNumber?: string;

  invoicingEmail: string;
  idNumber: string;
  displayName: string;

  address?: AddressModel;
  note?: string;

  customerGroup?: CustomerGroupModel;

  www?: string;
  publicNote?: string;
  photo?: string;

  contactPersonCompanyRelations: ContactPersonCompanyRelationModel[];
}

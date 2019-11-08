import { BaseService } from './base.service';
import { BaseEntityService } from './base.entity.service';
import { VatRegistrationModel, VatRegistrationSaveArgsModel } from '../..';

export abstract class VatRegistrationService extends BaseService
  implements BaseEntityService<VatRegistrationModel, VatRegistrationSaveArgsModel> {

  abstract async createEntity(): Promise<VatRegistrationModel>;
  abstract async loadEntity(id: number): Promise<VatRegistrationModel>;

  async save(args: VatRegistrationSaveArgsModel): Promise<VatRegistrationModel> {
    const vatRegistration =
      args.id ? await this.loadEntity(args.id) : await this.createEntity();
    const organization = await this.getInjector().organizationService.loadEntity(args.registeredForOrganizationId);
    const vatRegistrations = await organization.vatRegistrations;
    // end latest valid VAT registration
    for (const oldVatRegistration of vatRegistrations){
      if ((await oldVatRegistration.registeredIn).id === args.registeredInCountryId && !oldVatRegistration.end) {
        oldVatRegistration.end = args.start;
      }
    }
    vatRegistration.registeredIn = Promise.resolve(await super.loadCountry(args.registeredInCountryId));
    vatRegistration.end = args.end;
    vatRegistration.vatNumber = args.vatNumber;
    vatRegistration.start = args.start;
    vatRegistration.registeredFor = Promise.resolve(organization);

    return vatRegistration;
  }
}

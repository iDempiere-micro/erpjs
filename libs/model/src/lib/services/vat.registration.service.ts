import { BaseEntityServiceImplementation } from './base.entity.service';
import { VatRegistrationModel } from '../entities/vat.registration.model';
import { VatRegistrationSaveArgsModel } from '../args/vat.registration.save.args.model';

export const VatRegistrationServiceKey = 'VatRegistrationService';

export class VatRegistrationService extends BaseEntityServiceImplementation<VatRegistrationModel, VatRegistrationSaveArgsModel> {
  protected async doSave(args: VatRegistrationSaveArgsModel, vatRegistration: VatRegistrationModel): Promise<VatRegistrationModel> {
    const organization = await this.getInjector().organizationService.loadEntity(args.registeredForOrganizationId);
    const vatRegistrations = await organization.vatRegistrations;
    // end latest valid VAT registration
    for (const oldVatRegistration of vatRegistrations){
      if ((await oldVatRegistration.registeredIn).id === args.registeredInCountryIso && !oldVatRegistration.end) {
        oldVatRegistration.end = args.start;
      }
    }
    vatRegistration.registeredIn = Promise.resolve(await super.loadCountryByIsoCode(args.registeredInCountryIso));
    vatRegistration.end = args.end;
    vatRegistration.vatNumber = args.vatNumber;
    vatRegistration.start = args.start;
    vatRegistration.registeredFor = Promise.resolve(organization);

    return vatRegistration;
  }

  typeName(): string {
    return VatRegistrationServiceKey;
  }
}

import {
  AddressServiceKey,
  SalesInvoiceService,
  SalesInvoiceServiceKey,
  serviceProviders as modelServiceProviders,
} from '../model';
import { CustomAddressService } from './custom/custom.address.service';
import {
  SaveArgsValidationService,
  SaveArgsValidationServiceKey,
} from '../model';
import { CustomSalesInvoiceService } from './custom/custom.sales.invoice.service';
import { CustomSaveArgsValidationService } from './custom/custom.save.args.validation.service';

const addressServiceProvider = {
  provide: AddressServiceKey,
  useClass: CustomAddressService,
};
const salesInvoiceServiceProvider = {
  provide: SalesInvoiceServiceKey,
  useClass: CustomSalesInvoiceService,
};
const saveArgsValidationServiceProvider = {
  provide: SaveArgsValidationServiceKey,
  useClass: CustomSaveArgsValidationService,
};

export const serviceProviders = [
  addressServiceProvider,
  salesInvoiceServiceProvider,
  saveArgsValidationServiceProvider,
  ...modelServiceProviders.filter(
    (x) =>
      ![
        AddressServiceKey,
        SaveArgsValidationServiceKey,
        SalesInvoiceServiceKey,
      ].includes(x.provide)
  ),
];

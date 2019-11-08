import { PricingServiceModel } from './service.interfaces/pricing.service.model';

export class ModelConfiguration {
  private _pricingServiceModel: PricingServiceModel = undefined;
  get pricingServiceModel(): PricingServiceModel {
    return this._pricingServiceModel;
  }
  set pricingServiceModel(value: PricingServiceModel) {
    this._pricingServiceModel = value;
  }
}

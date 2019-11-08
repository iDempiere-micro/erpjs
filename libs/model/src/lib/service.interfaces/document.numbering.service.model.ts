import { BaseModel, OrganizationModel } from '@erpjs/model';

export interface DocumentNumberingServiceModel {
  getNextDocumentNumber<M extends BaseModel>(
    modelCtor: (new () => M)|Function,
    organization: OrganizationModel
  ): Promise<string>;
}

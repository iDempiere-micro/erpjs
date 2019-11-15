import { BaseModel } from '../entities/base.model';
import { OrganizationModel } from '../entities/organization.model';

export interface DocumentNumberingServiceModel {
  getNextDocumentNumber<M extends BaseModel>(
    modelCtor: (new () => M)|Function,
    organization: OrganizationModel
  ): Promise<string>;
}

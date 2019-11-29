import { BaseEntityServiceImplementation } from './base.entity.service';
import { SuspectModel } from '../entities/suspect.model';
import { SuspectSaveArgsModel } from '../args/suspect.save.args.model';

export const SuspectServiceKey = 'SuspectService';

export class SuspectService extends BaseEntityServiceImplementation<SuspectModel, SuspectSaveArgsModel> {
  protected async doSave(args: SuspectSaveArgsModel, entity: SuspectModel): Promise<SuspectModel> {
    entity.description = args.description;
    entity.url = args.url;
    entity.displayName = args.displayName;
    return entity;
  }

  typeName(): string {
    return SuspectServiceKey;
  }
}

import { BaseEntityServiceImplementation } from './base.entity.service';
import { ProspectModel } from '../entities/prospect.model';
import { ProspectSaveArgsModel } from '../args/prospect.save.args.model';
import { SuspectModel } from '../entities/suspect.model';

export const ProspectServiceKey = 'ProspectService';

export class ProspectService extends BaseEntityServiceImplementation<ProspectModel, ProspectSaveArgsModel> {
  protected async doSave(args: ProspectSaveArgsModel, entity: ProspectModel): Promise<ProspectModel> {
    entity.actionTaken = args.actionTaken;
    entity.problem = args.problem;
    entity.url = args.url;
    entity.displayName = args.displayName;
    entity.originated =  Promise.resolve(args.originated ? args.originated :
      ( args.originatedSuspectId ? await this.getInjector().suspectService.loadEntity(args.originatedSuspectId) : null ));
    return entity;
  }

  async createFrom(
    suspect: SuspectModel,
    problem: string,
    actionTaken: string,
  ): Promise<ProspectModel> {
    const result = this.save({
      displayName: suspect.displayName,
      problem,
      actionTaken,
      url: suspect.url,
      originated: suspect,
    });
    const taskService = this.getInjector().taskService;
    for (const task of await suspect.tasks) {
      task.prospect = result;
      await taskService.persist(task);
    }
    return result;
  }

  typeName(): string {
    return ProspectServiceKey;
  }
}

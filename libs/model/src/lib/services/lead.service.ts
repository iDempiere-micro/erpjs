import { BaseEntityServiceImplementation } from './base.entity.service';
import { LeadSaveArgsModel } from '../args/lead.save.args.model';
import { LeadModel } from '../entities/lead.model';

export const LeadServiceKey = 'LeadService';

export class LeadService extends BaseEntityServiceImplementation<LeadModel, LeadSaveArgsModel> {
  protected async doSave(args: LeadSaveArgsModel, entity: LeadModel): Promise<LeadModel> {
    entity.company = args.company;
    entity.email = args.email;
    entity.displayName = args.displayName;
    entity.phone = args.phone;
    entity.budget = args.budget;
    entity.currency = Promise.resolve(
      args.currency ? args.currency :
        await this.getInjector().currencyService.loadEntity(args.currencyId) );
    entity.expectedSolution = args.expectedSolution;
    entity.problemToSolve = args.problemToSolve;
    return entity;
  }

  typeName(): string {
    return LeadServiceKey;
  }

}

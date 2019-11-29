import { BaseEntityServiceImplementation } from './base.entity.service';
import { OpportunityModel } from '../entities/opportunity.model';
import { OpportunitySaveArgsModel } from '../args/opportunity.save.args.model';

export const OpportunityServiceKey = 'OpportunityService';

export class OpportunityService extends BaseEntityServiceImplementation<OpportunityModel, OpportunitySaveArgsModel> {
  protected async doSave(args: OpportunitySaveArgsModel, entity: OpportunityModel): Promise<OpportunityModel> {
    entity.closingDate = args.closingDate;
    entity.displayName = args.displayName;
    entity.phone = args.phone;
    entity.email = args.email;
    entity.company = args.company;
    entity.budget = args.budget;
    entity.currency = Promise.resolve(args.currency);
    return entity;
  }

  typeName(): string {
    return OpportunityServiceKey;
  }

}


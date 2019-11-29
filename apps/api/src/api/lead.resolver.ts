import { BaseEntityResolver } from './base.entity.resolver';
import { LeadModel, LeadService, LeadServiceKey } from '@erpjs/model';
import { LeadSaveArgs } from './args/lead.save.args';
import { Inject } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { Lead } from '@erpjs/data';

export class LeadResolver
  extends BaseEntityResolver<LeadModel, LeadSaveArgs, LeadService> {
  constructor(
    @Inject(LeadServiceKey) private readonly leadService: LeadService,
  ) {
    super();
  }

  getService(): LeadService {
    return this.leadService;
  }

  @Query(returns => [Lead])
  async leads(
    @CurrentUser() user,
  ): Promise<Array<LeadModel>> {
    return this.find(user);
  }

}

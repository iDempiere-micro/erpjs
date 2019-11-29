import { Field, InputType } from 'type-graphql';
import { BaseSaveArgs } from './base.save.args';
import { CurrencyModel, LeadSaveArgsModel } from '@erpjs/model';

@InputType()
export class LeadSaveArgs extends BaseSaveArgs implements LeadSaveArgsModel {
  @Field()
  budget: number;
  @Field({nullable: true})
  company: string;
  @Field()
  displayName: string;
  @Field()
  email: string;
  @Field({nullable: true})
  phone: string;
  @Field()
  currencyId?: number;
  currency?: CurrencyModel;
  @Field()
  expectedSolution: string;
  @Field()
  problemToSolve: string;
}

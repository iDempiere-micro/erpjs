import { Field, InputType } from 'type-graphql';
import { BaseSaveArgs } from './base.save.args';
import { ProspectSaveArgsModel } from '@erpjs/model';

@InputType()
export class ProspectSaveArgs extends BaseSaveArgs implements ProspectSaveArgsModel {
  @Field()
  actionTaken: string;
  @Field()
  displayName: string;
  @Field()
  problem: string;
  @Field()
  url: string;
  @Field({nullable: true})
  originatedSuspectId?: number;
}

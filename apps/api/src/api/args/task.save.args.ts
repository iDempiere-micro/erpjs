import { Field, InputType } from 'type-graphql';
import { BaseSaveArgs } from './base.save.args';
import { CustomerModel, ProspectModel, TaskSaveArgsModel, UserModel } from '@erpjs/model';

@InputType()
export class TaskSaveArgs extends BaseSaveArgs implements TaskSaveArgsModel {
  @Field({nullable:true})
  customerId?: number;
  customer?: CustomerModel;
  @Field()
  dueDate: Date;
  @Field()
  ownerId?: number;
  owner?: UserModel;
  @Field()
  responsibleId?: number;
  responsible?: UserModel;
  @Field()
  displayName: string;
  @Field({nullable:true})
  prospectId?: number;
  prospect?: ProspectModel;
}

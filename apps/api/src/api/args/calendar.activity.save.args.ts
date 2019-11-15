import { BaseSaveArgs } from './base.save.args';
import { CalendarActivitySaveArgsModel, CustomerModel, UserModel } from '@erpjs/model';
import { Field } from 'type-graphql';

export class CalendarActivitySaveArgs extends BaseSaveArgs implements CalendarActivitySaveArgsModel {
  @Field()
  customer: CustomerModel;
  @Field()
  end: Date;
  @Field()
  owner: UserModel;
  @Field()
  start: Date;
  @Field()
  displayName: string;
}

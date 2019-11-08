import { Field, InputType } from 'type-graphql';
import { BaseSaveArgsModel } from '@erpjs/model';

@InputType()
export class BaseSaveArgs implements BaseSaveArgsModel {
  @Field({nullable: true})
  id?: number;
}

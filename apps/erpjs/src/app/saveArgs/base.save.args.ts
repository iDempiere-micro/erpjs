import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseSaveArgsModel } from '../../model';

@InputType()
export class BaseSaveArgs implements BaseSaveArgsModel {
  @Field(() => Int, { nullable: true })
  id?: number;
}

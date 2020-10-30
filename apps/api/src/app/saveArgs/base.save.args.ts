import { Field, InputType } from '@nestjs/graphql';
import { BaseSaveArgsModel } from '../../model';

@InputType()
export class BaseSaveArgs implements BaseSaveArgsModel {
  @Field({ nullable: true })
  id?: number;
}

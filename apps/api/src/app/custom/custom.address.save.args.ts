import { Field, InputType } from '@nestjs/graphql';
import { AddressSaveArgs } from '../saveArgs/address.save.args';

@InputType()
export class CustomAddressSaveArgs extends AddressSaveArgs {
  @Field()
  blemba: string;
}

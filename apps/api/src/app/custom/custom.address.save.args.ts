import { AddressSaveArgs } from '../saveArgs/address.save.args';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CustomAddressSaveArgs extends AddressSaveArgs {
  @Field()
  blemba: string;
}

import { Field, InputType } from 'type-graphql';
import { AddressSaveArgsModel } from '@erpjs/model';

@InputType()
export class AddressSaveArgs implements AddressSaveArgsModel {
  @Field()
  city: string;
  @Field()
  countryId: number;
  @Field()
  line1: string;
  @Field()
  zipCode: string;
}

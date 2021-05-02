import { Field, InputType, Int } from '@nestjs/graphql';
import { AddressSaveArgsModel } from '../../model';

@InputType()
export class AddressSaveArgs implements AddressSaveArgsModel {
  @Field()
  city: string;
  @Field(()=>Int)
  countryId: number;
  @Field()
  line1: string;
  @Field()
  zipCode: string;
}

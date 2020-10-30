import { Field, InputType } from '@nestjs/graphql';
import { AddressSaveArgsModel } from '../../model';

@InputType()
export class AddressSaveArgs implements AddressSaveArgsModel {
  @Field()
  city: string;
  @Field()
  countryIsoCode: string;
  @Field()
  line1: string;
  @Field()
  zipCode: string;
}

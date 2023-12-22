import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SalesInvoicesInTime {
  @Field()
  group: string;
  @Field()
  date: string;
  @Field()
  value: number;
}

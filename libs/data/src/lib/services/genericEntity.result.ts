import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class GenericEntityResult {
    @Field()
    updated: boolean;

    @Field()
    date: Date;
}

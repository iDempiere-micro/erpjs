import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class GenericEntityArgs {
    @Field(type => Int)
    id: number;

    @Field()
    entityName: string;

    @Field()
    isCurrent: boolean;

}

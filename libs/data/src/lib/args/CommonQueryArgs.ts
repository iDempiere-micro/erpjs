import { Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class CommonQueryArgs {
    @Field(type => Int)
    @Min(0)
    skip = 0;

    @Field(type => Int, {nullable: true})
    @Min(1)
    @Max(100000)
    take = 100000;
}

import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginArgs {
    @Field()
    username: string;

    @Field()
    password: string;
}

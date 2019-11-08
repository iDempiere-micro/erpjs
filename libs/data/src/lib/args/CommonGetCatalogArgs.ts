import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class CommonGetCatalogArgs {
    @Field(type => String)
    catalogName: string;
}

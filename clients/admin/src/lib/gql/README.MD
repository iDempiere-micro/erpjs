GQLs
---------

This directory contains the gqls for the API communication.
When creating a new entity always create all the queries and mutations here.

Have a look e.g. into `accountingScheme.fragment.gql` and `accountingScheme.gql`files.

Also, please note that you have to use `fragment`s for the gql, and you have to name queries and mutations
as these will be used to generate the types when you do `yarn generate`.





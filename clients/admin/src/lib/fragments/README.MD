Fragments
---------

This directory contains the fragment definitions for the GraphQL.
When creating a new entity always add at least `entity_DETAIL_PARTS_RAW` and `entity_LIST_PARTS_RAW` for
the data returned for the entity detail and list.

Have a look e.g. into `accountingScheme.ts` file.
Also please note we do not use `fragment`s now, we "unfold" all the properties (mocks do not work with fragments).



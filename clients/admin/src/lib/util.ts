import type {ApolloError} from "@apollo/client/core";

export const getError = (error: ApolloError | any) : string => {
    console.log('*** getError', error);
    if (error.hasOwnProperty('message')) return error.message; else return error.toString();
}

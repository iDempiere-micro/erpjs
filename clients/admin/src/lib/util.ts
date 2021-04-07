import type { ApolloError } from '@apollo/client/core';
import { authStore } from './auth';
import { push } from 'svelte-spa-router';
import { urls } from '../pages/pathAndSegment';

const errorHandlers = [
    {
        error: 'Unexpected token < in JSON at position 0',
        handler: (): string => {
            authStore.set(null);
            return 'Keyclock probably not setup';
        },
    },
    {
        error: 'Authorization: Bearer <token> header missing',
        handler: (): string => {
            setTimeout(() => push('/' + urls.refresh), 100);
            return 'Refreshing the page...';
        },
    },
    {
        error: 'Request failed with status code 401',
        handler: (): string => {
            setTimeout(() => window.location.reload(), 100);
            return 'Logging again...';
        },
    },
];

export const getError = (error: ApolloError | any): string => {
    const message: string = error.hasOwnProperty('message') ? error.message : error.toString();
    let userMessage;
    for (const errorHandler of errorHandlers) {
        if (message.includes(errorHandler.error)) {
            userMessage = errorHandler.handler();
            break;
        }
    }
    if (userMessage) return userMessage;

    console.error('*** getError', error);
    return message;
};

export const throwOnUndefined = () : string => { throw new Error('Value was supposed to be defined'); }

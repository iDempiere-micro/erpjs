import type { ApolloError } from '@apollo/client/core';

const errorHandlers = [
    {
        error: 'Unexpected token < in JSON at position 0',
        handler: (): string => {
            (window as any).token = null;
            return 'Keyclock probably not setup';
        },
    },
    {
        error: 'Authorization: Bearer <token> header missing',
        handler: (): string => {
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
    const message: string = Object.prototype.hasOwnProperty.call(error, 'message')
        ? error.message
        : error.toString();
    let userMessage;
    for (const errorHandler of errorHandlers) {
        if (message.includes(errorHandler.error)) {
            userMessage = errorHandler.handler();
            break;
        }
    }
    if (userMessage) return userMessage;

    return message;
};

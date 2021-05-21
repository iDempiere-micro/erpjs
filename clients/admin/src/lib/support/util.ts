import type { ApolloError } from '@apollo/client/core';
import type { SelectItem } from './select';
import type { EntityDetailDisplayable } from '../model/model';

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

    logInternal('*** getError', error);
    return message;
};

export const throwOnUndefined = (): string => {
    throw new Error('Value was supposed to be defined');
};

export const printableString = (s: string | null | undefined): string => s || '';

export const mapDisplayableToSelectItem = (data: EntityDetailDisplayable[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName, //TODO: remove later
              text: displayName,
          }))
        : [];

export const logInternal = (message?: any, ...optionalParams: any[]): void => {
    const logs = (window as any).logs || [];
    logs.push({ message, ...optionalParams });
    (window as any).logs = logs;
};

export type SvelteAction<U extends any[], El extends any> = (
    node: El,
    ...args: U
) => {
    update?: (...args: U) => void;
    destroy?: () => void;
} | void;

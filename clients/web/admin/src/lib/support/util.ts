import type { ApolloError } from '@apollo/client/core';
import type { EntityDetailDisplayable } from '../model/model';
import type { ListItemType } from '../../dsl/types';
import type { SelectItem } from './select';

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

export const mapDisplayableToListItem = (data: EntityDetailDisplayable[]): ListItemType[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id.toString(),
              text: displayName,
          }))
        : [];

export const mapDisplayableToSelectItem = (data: EntityDetailDisplayable[]): SelectItem[] =>
    data
        ? data.map(({ id, displayName }) => ({
              value: id,
              label: displayName,
          }))
        : [];

export const logInternal = (message?: any, ...optionalParams: any[]): void => {
    const logs = (window as any).logs || [];
    logs.push({ message, ...optionalParams });
    (window as any).logs = logs;
};

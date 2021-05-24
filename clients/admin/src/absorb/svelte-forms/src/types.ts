import type { Store } from '../../../lib/support/types';

export interface ValidationResult {
    name: string;
    valid: boolean;
}
export type ValidationFuncSync = () => ValidationResult;
export type ValidationFuncAsync = () => Promise<ValidationResult>;
export type Validator = string | ValidationFuncSync | ValidationFuncAsync;

export interface FieldConfiguration {
    value: any;
    validators: Validator[];
    enabled?: boolean;
}

export type FieldConfigurationType = Record<string, FieldConfiguration>;

export interface FieldContent {
    name: string;
    value: any;
    data: any;
    errors: string[];
    pending: boolean;
    valid: boolean;
    enabled: boolean;
    dirty: boolean;
}

export type FieldContentType = Record<string, FieldContent>;

export interface Content {
    fields: FieldContentType;
    oldFields: FieldContentType;
    dirty: boolean;
    valid: boolean;
    initCheck?: boolean;
}

export interface Form extends Store<Content> {
    validate: () => void;
    reset: () => void;
}

export interface Config {
    initCheck?: boolean;
    validateOnChange?: boolean;
    stopAtFirstError?: boolean;
    stopAtFirstFieldError?: boolean;
}

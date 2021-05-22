import type { ErrorType } from './types';
import type { Form } from '../absorb/svelte-forms/src/types';
import type { MessageFormatter } from 'svelte-i18n/types/runtime/types';

export const onBlurValidate = (
    form: Form,
    id: string,
    format: MessageFormatter,
    min = 0,
): ErrorType => {
    let error: ErrorType;
    try {
        error = false;
        if (form) {
            form.validate();
            if (form.get().fields[id].errors.includes('required')) {
                error = format('validator.required');
            }
            if (form.get().fields[id].errors.includes('min')) {
                error = format('validator.minCharacters', { values: { min } });
            }
        }
        return error;
    } catch (e) {
        throw new Error(`onBlurValidate failed ${e}`);
    }
};

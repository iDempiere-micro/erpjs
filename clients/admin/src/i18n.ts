import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';
import cs from './locales/cs.json';
import en from './locales/en.json';

export const setupLocales = () => {
    addMessages('en', en);
    addMessages('cs', cs);

    init({
        fallbackLocale: 'en',
        initialLocale: getLocaleFromNavigator(),
    });
};

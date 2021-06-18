import { addMessages, getLocaleFromNavigator, init } from 'svelte-i18n';
import en from './locales/en.json';
import cs from './locales/cs.json';

export const setupLocales = () : void => {
    addMessages('en', en);
    addMessages('cs', cs);

    init({
        fallbackLocale: 'en',
        initialLocale: getLocaleFromNavigator(),
    });
};

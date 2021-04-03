import { NativeScriptConfig } from '@nativescript/core';

export default {
    id: 'cz.naseukoly.erpjs.mobile',
    appPath: 'app',
    appResourcesPath: 'App_Resources',
    android: {
        v8Flags: '--expose_gc',
        markingMode: 'none'
    }
} as NativeScriptConfig;

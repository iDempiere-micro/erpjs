import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'technology.sveltenative.template',
  appResourcesPath: 'app/App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  webpackConfigPath: './svelte-native.webpack.config.js',
  appPath: 'app',
} as NativeScriptConfig

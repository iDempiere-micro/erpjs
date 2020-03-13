import { isIOS } from 'tns-core-modules/platform';
import * as tnsApplication from 'tns-core-modules/application';

const Auth0 = require('nativescript-auth0');

export function installAuth0Helper() {
  if (isIOS) {
    const ObjCProtocols = [UIApplicationDelegate];
    const _queue: Object = {};

    function _promise(fn: string, args: any) {
      const constants = {
        // keep a copy of the call-time application state
        state: args.application.applicationState
      };

      const promise = Promise.resolve().then(() => {
        return { fn: fn, args: args, constants: constants };
      });

      let entry;

      if (!(entry = _queue[fn])) {
        entry = { callbacks: [], promise: promise };
        _queue[fn] = entry;
        return entry;
      }

      entry.promise = promise;

      if (entry.callbacks.length > 0) {
        entry.callbacks.forEach(function(callback) {
          entry.promise.then(callback);
        });
      }

      return entry;
    }

    function _apply(fn: string, callback: any) {
      let entry;

      if (!(entry = _queue[fn])) {
        entry = _queue[fn] = { callbacks: [], promise: false };
      }

      if (!entry.promise) {
        entry.callbacks.push(callback);
      } else {
        entry.promise.then(callback);
      }

      return entry;
    }

    tnsApplication.ios.delegate = (UIResponder as any).extend({
      applicationDidBecomeActive(application: UIApplication): void {
        console.log('applicationDidBecomeActive', application);
      },

      applicationDidEnterBackground(application: UIApplication) {
        console.log('applicationDidEnterBackground');
      },

      applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: any): boolean {
        console.log('applicationDidFinishLaunchingWithOptions');
        return _promise('applicationDidFinishLaunchingWithOptions', { application, launchOptions });
      },

      applicationOpenURLOptions(application: UIApplication, url: NSURL, options: NSDictionary<string, any>) {
        console.log('applicationOpenURLOptions');
        return _promise('applicationOpenURLOptions', { application, url, options });
      },

      applicationContinueUserActivityRestorationHandler(application: UIApplication, userActivity: NSUserActivity, restorationHandler:
        (p1: NSArray<any>) => void) {
        console.log('applicationContinueUserActivityRestorationHandler');
        return _promise('applicationContinueUserActivityRestorationHandler', {
          application,
          userActivity,
          restorationHandler
        });
      },
    }, {
      protocols: [UIApplicationDelegate]
    });

    _apply('applicationOpenURLOptions', (event) => {
      return Auth0.resumeAuth(event.args.url, event.args.options);
    });
  }
}

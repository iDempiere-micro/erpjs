import * as cls from 'cls-hooked';

const sessionKey = 'defaultSession';

export class Session {
  static get default() {
    return cls.getNamespace(sessionKey);
  }

  static get<T>(key: string): T {
    if (!this.default) return null;
    return this.default.get(key);
  }

  static set(key: string, val: any) {
    return this.default.set(key, val);
  }

  static createDefault() {
    return cls.createNamespace(sessionKey);
  }
}

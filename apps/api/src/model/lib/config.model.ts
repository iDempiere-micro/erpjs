import { BaseModel } from './base.model';

export type ConfigData = Record<string, unknown>;

export interface ConfigModel<T extends ConfigData> extends BaseModel {
  displayName: string;
  content: T;
}

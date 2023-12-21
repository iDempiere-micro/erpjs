import { BaseSaveArgsModel } from './base.save.args.model';
import { ConfigData } from './config.model';

export interface ConfigSaveArgsModel<T extends ConfigData>
  extends BaseSaveArgsModel {
  displayName: string;
  content: T;
}

import { BaseModel } from './base.model';

export interface EventLogModel extends BaseModel {
  displayName: string;
  content: any;
}

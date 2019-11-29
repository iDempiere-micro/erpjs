import { BaseModel } from './base.model';
import { HasTasks } from '../helpers/has.tasks';

/**
 * Everyone in the target market
 */
export interface SuspectModel extends BaseModel, HasTasks {
  description: string;
  url: string;
}

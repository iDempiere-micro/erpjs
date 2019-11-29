/**
 * Anyone who has taken action to solve a problem that you can assist them with
 */
import { BaseModel } from './base.model';
import { SuspectModel } from './suspect.model';
import { HasTasks } from '../helpers/has.tasks';

export interface ProspectModel extends BaseModel, HasTasks {
  originated?: Promise<SuspectModel>;
  problem: string;
  actionTaken: string;
  url: string;
}

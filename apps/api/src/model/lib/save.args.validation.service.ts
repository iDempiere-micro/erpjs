import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm/index';
import { BaseSaveArgsModel } from './base.save.args.model';

export const SaveArgsValidationServiceKey = 'SaveArgsValidationService';

@Injectable()
export class SaveArgsValidationService {
  async checkIsSaveArgValid<T extends BaseSaveArgsModel>(
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    _transactionalEntityManager: EntityManager,
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    _typeName: string,
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    _args: T,
  ): Promise<void> {
    /* left intentionally empty for the real validation engine */
  }
}

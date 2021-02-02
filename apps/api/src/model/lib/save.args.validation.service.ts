import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm/index';
import { BaseSaveArgsModel } from './base.save.args.model';

export const SaveArgsValidationServiceKey = 'SaveArgsValidationService';

@Injectable()
export class SaveArgsValidationService {
  async checkIsSaveArgValid<T extends BaseSaveArgsModel>(
    transactionalEntityManager: EntityManager,
    typeName: string,
    args: T,
  ): Promise<void> {
    /* left intentionally empty for the real validation engine */
  }
}

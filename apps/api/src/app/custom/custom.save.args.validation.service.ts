import { EntityManager } from 'typeorm/index';
import { Injectable } from '@nestjs/common';
import { BaseSaveArgsModel, getService } from '../../model';

/**
 * Custom save args validation service.
 * Checks if the saving service has `checkSaveArgs` method implemented and calls it if it exists
 */
@Injectable()
export class CustomSaveArgsValidationService {
  async checkIsSaveArgValid<T extends BaseSaveArgsModel>(
    transactionalEntityManager: EntityManager,
    typeName: string,
    args: T,
  ): Promise<void> {
    const service = getService(typeName);
    if ((service as any).checkSaveArgs) {
      await (service as any).checkSaveArgs(transactionalEntityManager, args);
    }
  }
}

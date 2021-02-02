import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseModel } from './base.model';
import { OrganizationModel } from './organization.model';
import { DocumentNumberSequence } from '../generated/entities/DocumentNumberSequence';

export const DocumentNumberingServiceKey = 'DocumentNumberingService';

@Injectable()
export class DocumentNumberingService {
  async getNextDocumentNumber<M extends BaseModel>(
    manager: EntityManager,
    // eslint-disable-next-line @typescript-eslint/ban-types
    modelCtor: (new () => M) | Function,
    organization: OrganizationModel,
  ): Promise<string> {
    const model = await manager.getRepository(DocumentNumberSequence).findOne({
      where: { forType: modelCtor.name, organization },
      order: { id: 'DESC' },
    });
    const result = model.current;
    model.current = +model.current + 1;
    await manager.save(model);
    return result.toString();
  }
}

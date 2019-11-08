import { Injectable } from '@nestjs/common';
import { BaseModel, DocumentNumberingServiceModel, OrganizationModel } from '@erpjs/model';
import { EntityManager } from 'typeorm';
import { DocumentNumberSequence } from '../entities/document.number.sequence';

@Injectable()
export class DocumentNumberingService implements DocumentNumberingServiceModel {
  constructor(private readonly manager: EntityManager) {}

  async getNextDocumentNumber<M extends BaseModel>(
    modelCtor: (new () => M)|Function, organization: OrganizationModel
  ): Promise<string> {
      const model = await this.manager.getRepository(DocumentNumberSequence)
        .findOne({where: { forType: modelCtor.name, organization }});
      const result = model.current;
      model.current = +model.current + 1;
      await this.manager.save(model);
      return result.toString();
    }
}

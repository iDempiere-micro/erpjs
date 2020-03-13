import { Injectable } from '@nestjs/common';
import { BaseModel, DocumentNumberingServiceModel, OrganizationModel } from '@erpjs/model';
import { DocumentNumberSequence } from '../entities/document.number.sequence';
import { ModelModule } from './model.module';

@Injectable()
export class DocumentNumberingService implements DocumentNumberingServiceModel {
  async getNextDocumentNumber<M extends BaseModel>(
    modelCtor: (new () => M)|Function, organization: OrganizationModel
  ): Promise<string> {
      const manager = ModelModule.getEntityManager();
      const model = await manager.getRepository(DocumentNumberSequence)
        .findOne({where: { forType: modelCtor.name, organization }, order: { id: 'DESC' } });
      const result = model.current;
      model.current = +model.current + 1;
      await manager.save(model);
      return result.toString();
    }
}

import { Injectable } from '@nestjs/common';
import { EntityManager, getRepository } from 'typeorm';
import { GenericEntityArgs } from '../..';
import { GenericEntityResult } from './genericEntity.result';

@Injectable()
export class GenericEntityService {
    constructor(
        private manager: EntityManager,
    ) {}

    async setIsCurrent(args: GenericEntityArgs): Promise<GenericEntityResult> {
        const repo = this.manager.getRepository(args.entityName);
        const obj: any = await repo.findOneOrFail(args.id);
        obj.isCurrent = args.isCurrent;
        const result = { updated: false, date: new Date() };
        await repo.save(obj).then(
            (res) => {
                result.updated = true;
            },
            (err) => {
                console.log(err);
            },
        );
        return result;
    }

  async getIsCurrent(args: GenericEntityArgs): Promise<GenericEntityResult> {
    const repo = this.manager.getRepository(args.entityName);
    const obj: any = await repo.findOneOrFail(args.id);
    const result = { updated: false, date: new Date() };
    return result;
  }


    async getCatValues(catName: string): Promise<any[]> {
        return await getRepository(catName).find({isCurrent: true});
    }
}

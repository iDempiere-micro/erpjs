import { Injectable } from '@nestjs/common';
import { instanceOfWithHistoryEntity, WithHistory } from '../entities/shared/with.history';
import { EntityBase } from '../entities/shared/EntityBase';
import { EntityManager } from 'typeorm';
import { DynamicClass } from '../class.store';
import { HistoryEntity, instanceOfHistoryEntity, isHistoryField } from '../entities/shared/HistoryEntity';

function isPromise(value) {
    return Boolean(value && typeof value.then === 'function');
}

@Injectable()
export class HistoryService {
    private async doSaveH(e: WithHistory, e1: EntityBase, manager: EntityManager): Promise<void> {
        const h = new DynamicClass(e.historyClassName) as HistoryEntity;
        for (const property of Object.getOwnPropertyNames(e)) {
            const value = e[property];
            if (
                property !== 'id'
                && ( !isPromise(value) || (isPromise(value) && isHistoryField(e, property)) )
            ) {
                h[property] = await value;
            }
        }
        h.originId = e1.id;
        // console.log('history: ' + JSON.stringify(h));
        // console.log('orig: ' + JSON.stringify(e));
        manager.getRepository(e.historyClassName).save(h);
    }

    async saveHistoryRecord(entity: EntityBase, text: string, manager: EntityManager) {
        if (instanceOfHistoryEntity(entity)) {
            // console.log(`${text} - ignoring history record...`);
        } else if (instanceOfWithHistoryEntity(entity)) {
            // console.log(`${text} - insert new record into history...`);
            await this.doSaveH(entity, entity, manager);
        } else {
            // console.log(`${text} - ignoring non history record...`);
        }
    }
}

import { BaseEntityServiceImplementation } from './base.entity.service';
import { WarehouseModel } from '../entities/warehouse.model';
import { WarehouseSaveArgsModel } from '../args/warehouse.save.args.model';

export const WarehouseServiceKey = 'WarehouseService';

export class WarehouseService extends BaseEntityServiceImplementation<WarehouseModel, WarehouseSaveArgsModel> {
  protected async doSave(args: WarehouseSaveArgsModel, entity: WarehouseModel): Promise<WarehouseModel> {
    const { addressService } = this.getInjector();

    entity.displayName = args.displayName;
    entity.address = Promise.resolve(await addressService.save(args.address));
    return entity;
  }

  typeName(): string {
    return WarehouseServiceKey;
  }

}


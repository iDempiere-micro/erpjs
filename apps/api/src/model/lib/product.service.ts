import { BaseEntityService } from './base.entity.service';
import { ProductModel } from './product.model';
import { ProductSaveArgsModel } from './product.save.args.model';
import { EntityManager, Repository } from 'typeorm/index';
import { Injectable } from '@nestjs/common';
import { Product } from './entity.base';

export const ProductServiceKey = 'ProductService';

@Injectable()
export class ProductService extends BaseEntityService<
  ProductModel,
  ProductSaveArgsModel
> {
  createEntity(): ProductModel {
    return new Product();
  }

  protected getRepository(
    transactionalEntityManager
  ): Repository<ProductModel> {
    return transactionalEntityManager.getRepository(Product);
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: ProductSaveArgsModel,
    entity: ProductModel
  ): Promise<ProductModel> {
    entity.displayName = args.displayName;
    entity.sku = args.sku;
    return entity;
  }

  typeName(): string {
    return ProductServiceKey;
  }

  getProduct = async (transactionalEntityManager: EntityManager, sku: string) =>
    this.getRepository(transactionalEntityManager).findOne({
      where: { sku },
    });
}

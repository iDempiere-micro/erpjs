import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { Product } from '../generated/entities/Product';
import { BaseEntityService } from './base.entity.service';
import { ProductModel } from './product.model';
import { ProductSaveArgsModel } from './product.save.args.model';

export const ProductServiceKey = 'ProductService';

@Injectable()
export class ProductService extends BaseEntityService<
  ProductModel,
  ProductSaveArgsModel
> {
  loadEntityByIdRelations(): string[] {
    return ['defaultUoM'];
  }

  createEntity(): ProductModel {
    return new Product();
  }

  protected getRepository(
    transactionalEntityManager,
  ): Repository<ProductModel> {
    return transactionalEntityManager.getRepository(Product);
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: ProductSaveArgsModel,
    entity: ProductModel,
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

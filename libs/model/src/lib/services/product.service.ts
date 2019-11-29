import { BaseEntityServiceImplementation } from './base.entity.service';
import { ProductModel } from '../entities/product.model';
import { ProductSaveArgsModel } from '../args/product.save.args.model';

export const ProductServiceKey = 'ProductService';

export class ProductService extends BaseEntityServiceImplementation<ProductModel, ProductSaveArgsModel> {
  getProduct: (sku: string) => Promise<ProductModel>;

  protected async doSave(args: ProductSaveArgsModel, entity: ProductModel): Promise<ProductModel> {
    const {accountService} = this.getInjector();
    entity.displayName = args.displayName;
    entity.buyingAccount =
      Promise.resolve(
        args.buyingAccount ? args.buyingAccount : await accountService.getAccountByCode(args.buyingAccountCode)
      );
    entity.sellingAccount =
      Promise.resolve(
        args.sellingAccount ? args.sellingAccount : await accountService.getAccountByCode(args.sellingAccountCode)
      );
    entity.sku = args.sku;
    return entity;
  }

  typeName(): string {
    return ProductServiceKey;
  }

}

import { BaseEntityResolver } from './base.entity.resolver';
import { ProductModel, ProductService, ProductServiceKey } from '@erpjs/model';
import { ProductSaveArgs } from './args/product.save.args';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { User as CurrentUser } from './user.decorator';
import { CommonGetOneArgs, Product } from '@erpjs/data';

export class ProductResolver extends BaseEntityResolver<ProductModel, ProductSaveArgs, ProductService>
{
  constructor(
    @Inject(ProductServiceKey) private readonly productService : ProductService,
    ) {
    super();
  }

  getService(): ProductService {
    return this.productService;
  }

  @Query(returns => [Product])
  async products(
    @CurrentUser() user,
  ) {
    return this.find(user);
  }

  @Mutation(returns => Product)
  async product(
    @Args('args') objData: ProductSaveArgs , @CurrentUser() user,
  ): Promise<ProductModel> {
    return this.save(user, objData);
  }

  @Query(returns => Product)
  async productById(
    @Args() args: CommonGetOneArgs,
    @CurrentUser() user,
  ): Promise<ProductModel> {
    return this.findById(args.id, user);
  }
}

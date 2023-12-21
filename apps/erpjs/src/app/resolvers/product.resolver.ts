import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Product } from '../../model/generated/entities/Product';
import { ProductModel, ProductService, ProductServiceKey } from '../../model';
import { getManager } from 'typeorm';
import { ProductSaveArgs } from '../saveArgs/product.save.args';

@Resolver(() => Product)
@UseGuards(GqlAuthGuard)
export class ProductResolver {
  constructor(
    @Inject(ProductServiceKey)
    protected readonly productService: ProductService,
  ) {}

  @Query(() => [Product])
  async products() {
    return await this.productService.loadEntities(getManager());
  }

  @Query(() => Product)
  async product(@Args('id', { type: () => Int }) id: number) {
    const result = await this.productService.loadEntityById(getManager(), id);
    return result;
  }

  @Mutation(() => Product)
  async saveProduct(
    @Args('args') objData: ProductSaveArgs,
    @CurrentUser() user,
  ): Promise<ProductModel> {
    return await this.productService.save(getManager(), objData, user);
  }
}

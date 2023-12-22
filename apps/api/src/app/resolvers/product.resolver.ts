import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Inject, UseGuards } from '@nestjs/common';
import { CurrentUser, GqlAuthGuard } from '../../auth';
import { Product } from '../../model/generated/entities/Product';
import { ProductModel, ProductService, ProductServiceKey } from '../../model';
import { EntityManager } from 'typeorm';
import { ProductSaveArgs } from '../saveArgs/product.save.args';
import { InjectEntityManager } from '@nestjs/typeorm';

@Resolver(() => Product)
@UseGuards(GqlAuthGuard)
export class ProductResolver {
  constructor(
    @Inject(ProductServiceKey)
    protected readonly productService: ProductService,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Query(() => [Product])
  async products() {
    return await this.productService.loadEntities(this.entityManager);
  }

  @Query(() => Product)
  async product(@Args('id', { type: () => Int }) id: number) {
    const result = await this.productService.loadEntityById(
      this.entityManager,
      id,
    );
    return result;
  }

  @Mutation(() => Product)
  async saveProduct(
    @Args('args') objData: ProductSaveArgs,
    @CurrentUser() user,
  ): Promise<ProductModel> {
    return await this.productService.save(this.entityManager, objData, user);
  }
}

import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { ProductService } from '@erpjs/model';

@Injectable()
export class ProductServiceImplementation extends Implement(ProductService) {
  constructor() {
    super();
    this.getProduct = (sku: string) =>
      this.getRepository().findOne({where: {sku}})
  }
}

import { Field, InputType } from '@nestjs/graphql';
import { AddressSaveArgs } from './address.save.args';
import { BaseSaveArgs } from './base.save.args';
import { ProductSaveArgsModel, CustomerSaveArgsModel } from '../../model';
import { AddressSaveArgsType } from '../saveArgs';

@InputType()
export class ProductSaveArgs extends BaseSaveArgs
  implements ProductSaveArgsModel {
  @Field()
  displayName: string;
  @Field()
  sku: string;
}

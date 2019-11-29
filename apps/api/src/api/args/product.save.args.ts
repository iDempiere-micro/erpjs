import { Field, InputType } from 'type-graphql';
import { BaseSaveArgs } from './base.save.args';
import { AccountModel, ProductSaveArgsModel } from '@erpjs/model';

@InputType()
export class ProductSaveArgs extends BaseSaveArgs implements ProductSaveArgsModel {
  @Field()
  buyingAccountCode: string;
  buyingAccount: AccountModel;
  @Field()
  displayName: string;
  @Field()
  sellingAccountCode: string;
  sellingAccount: AccountModel;
  @Field()
  sku: string;
}

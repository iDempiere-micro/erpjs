import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { AccountingSchemeModel, AccountModel } from '@erpjs/model';
import { Product } from './product';
import { AccountingScheme } from './accounting.scheme';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

@Entity()
@ObjectType()
export class Account extends UniqueDisplayEntityBase implements AccountModel {
  @Field(type => [Product], { nullable: true })
  @OneToMany(type => Product, product => product.buyingAccount)
  productsBought: Promise<Array<Product>>;

  @Field(type => [Product], { nullable: true })
  @OneToMany(type => Product, product => product.sellingAccount)
  productsSold: Promise<Array<Product>>;

  @Field(type => AccountingScheme)
  @ManyToOne(type => AccountingScheme, accountingScheme => accountingScheme.accounts, { nullable: false })
  accountingScheme: Promise<AccountingSchemeModel>;

  @Column()
  @Field()
  @Index({unique: true})
  code: string;
}

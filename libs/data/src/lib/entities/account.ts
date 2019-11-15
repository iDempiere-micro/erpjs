import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { AccountingSchemeModel, AccountModel } from '@erpjs/model';
import { Product } from './product';
import { AccountingScheme } from './accounting.scheme';

@Entity()
@ObjectType()
export class Account extends EntityBase implements AccountModel {
  @Index({unique: true})
  @Column()
  @Field()
  displayName: string;

  @Field(type => [Product], { nullable: true })
  @OneToMany(type => Product, product => product.buyingAccount)
  productsBought: Promise<Array<Product>>;

  @Field(type => [Product], { nullable: true })
  @OneToMany(type => Product, product => product.sellingAccount)
  productsSold: Promise<Array<Product>>;

  @Field(type => AccountingScheme)
  @ManyToOne(type => AccountingScheme, accountingScheme => accountingScheme.accounts, { nullable: false })
  accountingScheme: Promise<AccountingSchemeModel>;

}

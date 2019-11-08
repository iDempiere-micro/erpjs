import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { CurrencyModel } from '@erpjs/model';
import { SalesInvoice } from './sales.invoice';
import { AccountingScheme } from './accounting.scheme';

@Entity()
@ObjectType()
export class Currency extends EntityBase implements CurrencyModel {
  @Column()
  @Field()
  displayName: string;

  @Column()
  @Field()
  isoCode: string;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(type => SalesInvoice, salesInvoice => salesInvoice.currency)
  salesInvoices: Promise<Array<SalesInvoice>>;

  @Field(type => [AccountingScheme], { nullable: true })
  @OneToMany(type => AccountingScheme, accountingScheme => accountingScheme.currency)
  accountingSchemas: Promise<Array<AccountingScheme>>;
}

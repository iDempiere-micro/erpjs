import { Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { AccountingSchemeModel, CurrencyModel } from '@erpjs/model';
import { Currency } from './currency';
import { Account } from './account';
import { Organization } from './organization';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

@Entity()
@ObjectType()
export class AccountingScheme extends UniqueDisplayEntityBase implements AccountingSchemeModel {
  @Field(type => Currency)
  @ManyToOne(type => Currency, currency => currency.accountingSchemas, { nullable: false })
  currency: Promise<CurrencyModel>;

  @Field(type => [Account], { nullable: true })
  @OneToMany(type => Account, account => account.accountingScheme)
  accounts: Promise<Array<Account>>;

  // do not propagate array of Organization to the client
  @OneToMany(type => Organization, organization => organization.accountingScheme)
  organizations: Promise<Array<Organization>>;
}

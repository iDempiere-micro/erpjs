import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { AccountingSchemeModel, CurrencyModel } from '@erpjs/model';
import { Currency } from './currency';
import { Account } from './account';
import { Organization } from './organization';

@Entity()
@ObjectType()
export class AccountingScheme extends EntityBase implements AccountingSchemeModel {
  @Column()
  @Field()
  @Index({unique: true})
  displayName: string;

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

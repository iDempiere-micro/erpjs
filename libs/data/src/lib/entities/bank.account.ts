import { EntityBase } from './shared/EntityBase';
import { BankAccountModel, BankModel } from '@erpjs/model';
import { Bank } from './bank';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { SalesInvoice } from './sales.invoice';
import { Organization } from './organization';

@Entity()
@ObjectType()
export class BankAccount extends EntityBase implements BankAccountModel {
  @Column()
  @Field()
  iban: string;

  @Column()
  @Field()
  swift: string;
  @Field(type => Bank)
  @ManyToOne(type => Bank, bank => bank.bankAccounts, { nullable: false })
  bank: Promise<BankModel>;

  @Column()
  @Field()
  bankAccountCustomerPrintableNumber: string;

  @Column()
  @Field()
  displayName: string;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(type => SalesInvoice, salesInvoice => salesInvoice.bankAccount)
  salesInvoices: Promise<Array<SalesInvoice>>;

  @Field(type => [Organization], { nullable: true })
  @OneToMany(type => Organization, organization => organization.bankAccount)
  organizations: Promise<Array<Organization>>;
}

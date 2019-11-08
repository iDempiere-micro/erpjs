import { EntityBase } from './shared/EntityBase';
import { BankModel } from '@erpjs/model';
import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { BankAccount } from './bank.account';

@Entity()
@ObjectType()
export class Bank extends EntityBase implements BankModel {
  @Column()
  @Field()
  bankIdentifierCode: string;

  @Column()
  @Field()
  displayName: string;

  @Field(type => [BankAccount], { nullable: true })
  @OneToMany(type => BankAccount, bankAccount => bankAccount.bank)
  bankAccounts: Promise<Array<BankAccount>>
}

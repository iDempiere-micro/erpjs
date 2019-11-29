import { BankModel } from '@erpjs/model';
import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { BankAccount } from './bank.account';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

@Entity()
@ObjectType()
export class Bank extends UniqueDisplayEntityBase implements BankModel {
  @Column()
  @Field()
  bankIdentifierCode: string;

  @Field(type => [BankAccount], { nullable: true })
  @OneToMany(type => BankAccount, bankAccount => bankAccount.bank)
  bankAccounts: Promise<Array<BankAccount>>
}

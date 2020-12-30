import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BankAccount } from "./BankAccount";
import { BankModel } from '../../lib/bank.model';

@Index("IDX_1930777e62854add6a64f50d42", ["displayName"], { unique: true })
@Entity("bank", { schema: "public" })
export class Bank implements BankModel {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "updtTs",
    default: () => "now()",
  })
  updtTs: Date;

  @Column("integer", { name: "updtOpId", default: () => "0" })
  updtOpId: number;

  @Column("boolean", { name: "isActive", default: () => "true" })
  isActive: boolean;

  @Column("boolean", { name: "isCurrent", default: () => "true" })
  isCurrent: boolean;

  @Column("character varying", { name: "displayName" })
  displayName: string;

  @Column("character varying", { name: "bankIdentifierCode" })
  bankIdentifierCode: string;

  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.bank)
  bankAccounts: BankAccount[];
}

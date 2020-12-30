import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Currency } from "./Currency";
import { Organization } from "./Organization";
import { AccountingSchemeModel } from '../../lib/accounting.scheme.model';
import { User } from './User';
import { Field } from '@nestjs/graphql';
import { UserModel } from '../../lib/user.model';

@Index("IDX_7f415d9c097ba5ef53afe8c39f", ["displayName"], { unique: true })
@Entity("accounting_scheme", { schema: "public" })
export class AccountingScheme implements AccountingSchemeModel {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "updtTs",
    default: () => "now()",
  })
  updtTs: Date;

  @ManyToOne(() => User, (user) => user.updAccountingSchemes, {nullable: false, eager: true})
  @JoinColumn([{ name: "updtOpId", referencedColumnName: "id" }])
  @Field(()=>User)
  updtOp: UserModel;

  @Column("boolean", { name: "isActive", default: () => "true" })
  isActive: boolean;

  @Column("boolean", { name: "isCurrent", default: () => "true" })
  isCurrent: boolean;

  @Column("character varying", { name: "displayName" })
  displayName: string;

  @ManyToOne(() => Currency, (currency) => currency.accountingSchemes, {eager: true})
  @JoinColumn([{ name: "currencyId", referencedColumnName: "id" }])
  currency: Currency;

  @OneToMany(
    () => Organization,
    (organization) => organization.accountingScheme
  )
  organizations: Organization[];
}

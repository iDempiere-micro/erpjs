import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DocumentNumberSequence } from "./DocumentNumberSequence";
import { AccountingScheme } from "./AccountingScheme";
import { BankAccount } from "./BankAccount";
import { Address } from "./Address";
import { SalesInvoice } from "./SalesInvoice";
import { UserToOrganization } from "./UserToOrganization";
import { OrganizationModel } from '../../lib/organization.model';
import { Field, ObjectType } from '@nestjs/graphql';

@Index("IDX_4177d3499a2c7edb42ead3d916", ["displayName"], { unique: true })
@Index("IDX_99ecb4de1fda7ee51fb91b3055", ["vatNumber"], { unique: true })
@Entity("organization", { schema: "public" })
@ObjectType()
export class Organization implements OrganizationModel {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  @Field()
  id: number;

  @Column("timestamp without time zone", {
    name: "updtTs",
    default: () => "now()",
  })
  @Field()
  updtTs: Date;

  @Column("integer", { name: "updtOpId", default: () => "0" })
  @Field()
  updtOpId: number;

  @Column("boolean", { name: "isActive", default: () => "true" })
  @Field()
  isActive: boolean;

  @Column("boolean", { name: "isCurrent", default: () => "true" })
  @Field()
  isCurrent: boolean;

  @Column("character varying", { name: "displayName" })
  @Field()
  displayName: string;

  @Column("character varying", { name: "contact" })
  @Field()
  contact: string;

  @Column("character varying", { name: "legalName" })
  @Field()
  legalName: string;

  @Column("character varying", { name: "registration" })
  @Field()
  registration: string;

  @Column("character varying", { name: "idNumber" })
  @Field()
  idNumber: string;

  @Column("character varying", { name: "vatNumber", nullable: true })
  @Field()
  vatNumber: string | null;

  @OneToMany(
    () => DocumentNumberSequence,
    (documentNumberSequence) => documentNumberSequence.organization
  )
  documentNumberSequences: DocumentNumberSequence[];

  @ManyToOne(
    () => AccountingScheme,
    (accountingScheme) => accountingScheme.organizations
  )
  @JoinColumn([{ name: "accountingSchemeId", referencedColumnName: "id" }])
  accountingScheme: AccountingScheme;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.organizations)
  @JoinColumn([{ name: "bankAccountId", referencedColumnName: "id" }])
  bankAccount: BankAccount;

  @ManyToOne(() => Address, (address) => address.organizations)
  @JoinColumn([{ name: "legalAddressId", referencedColumnName: "id" }])
  legalAddress: Address;

  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.organization)
  salesInvoices: SalesInvoice[];

  @OneToMany(
    () => UserToOrganization,
    (userToOrganization) => userToOrganization.organization
  )
  userToOrganizations: UserToOrganization[];
}

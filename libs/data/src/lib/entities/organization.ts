import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { AccountingSchemeModel, OrganizationModel, ProjectModel } from '@erpjs/model';
import { Address } from './address';
import { VatRegistration } from './vat.registration';
import { SalesInvoice } from './sales.invoice';
import { BankAccount } from './bank.account';
import { AccountingScheme } from './accounting.scheme';
import { UserToOrganization } from './user.to.organization';
import { DocumentNumberSequence } from './document.number.sequence';
import { Project } from './project';
import { VendorInvoice } from '@erpjs/data';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';
import { RecurringSalesInvoice } from './recurring.sales.invoice';

@Entity()
@ObjectType()
export class Organization extends UniqueDisplayEntityBase implements OrganizationModel {
  @Column()
  @Field()
  contact: string;

  @Field(type => Address)
  @ManyToOne(type => Address, address => address.organizationRegistratedAddresses, { nullable: true })
  legalAddress: Promise<Address>;

  @Column()
  @Field()
  legalName: string;

  @Field(type => [VatRegistration], { nullable: true })
  @OneToMany(type => VatRegistration, vatRegistration => vatRegistration.registeredFor)
  vatRegistrations: Promise<Array<VatRegistration>>;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(type => SalesInvoice, salesInvoice => salesInvoice.organization)
  salesInvoices: Promise<Array<SalesInvoice>>;

  @Field(type => [SalesInvoice], { nullable: true })
  @OneToMany(type => SalesInvoice, salesInvoice => salesInvoice.organization)
  recurringSalesInvoices: Promise<Array<RecurringSalesInvoice>>;

  @Field(type => [VendorInvoice], { nullable: true })
  @OneToMany(type => VendorInvoice, vendorInvoice => vendorInvoice.organization)
  vendorInvoices: Promise<Array<VendorInvoice>>;

  @Field(type => BankAccount)
  @ManyToOne(type => BankAccount, bankAccount => bankAccount.organizations, { nullable: true })
  bankAccount: Promise<BankAccount>;

  @Field(type => AccountingScheme)
  @ManyToOne(type => AccountingScheme, accountingScheme => accountingScheme.organizations, { nullable: false })
  accountingScheme: Promise<AccountingSchemeModel>;

  @Field(type => [UserToOrganization], { nullable: true })
  @OneToMany(type => UserToOrganization, userToOrganization => userToOrganization.organization)
  users: Promise<Array<UserToOrganization>>;

  @Field(type => [DocumentNumberSequence], { nullable: true })
  @OneToMany(type => DocumentNumberSequence, documentNumberSequence => documentNumberSequence.organization)
  documentNumberSequences: Promise<Array<DocumentNumberSequence>>;

  @Field(type => [Project], { nullable: true })
  @OneToMany(type => Project, project => project.owner)
  projects: Promise<Array<ProjectModel>>;

  @Column()
  @Field()
  registration: string;

  @Column()
  @Field()
  idNumber: string;

}

import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { CurrencyModel, CustomerModel, OrganizationModel, ProductQuantityPriceTaxModel, RecurringSalesInvoiceModel } from '@erpjs/model';
import { BankAccount } from './bank.account';
import { Currency } from './currency';
import { Customer } from '@erpjs/data';
import { Organization } from './organization';
import { RecurringSalesInvoiceLine } from './recurring.sales.invoice.line';

@Entity()
@ObjectType()
export class RecurringSalesInvoice extends EntityBase implements RecurringSalesInvoiceModel {
  @Field(type => BankAccount)
  @ManyToOne(type => BankAccount, bankAccount => bankAccount.recurringSalesInvoices, { nullable: false })
  bankAccount: Promise<BankAccount>;

  @Field(type => Currency)
  @ManyToOne(type => Currency, currency => currency.recurringSalesInvoices, { nullable: false })
  currency: Promise<CurrencyModel>;

  @Field(type => Customer)
  @ManyToOne(type => Customer, customer => customer.salesInvoices, { nullable: false })
  customer: Promise<CustomerModel>;

  get displayName(): string {
    return `R-#${this.id}`;
  }

  @Field(type => [RecurringSalesInvoiceLine], { nullable: true })
  @OneToMany(type => RecurringSalesInvoiceLine, recurringSalesInvoiceLine => recurringSalesInvoiceLine.invoice)
  lines: Promise<Array<ProductQuantityPriceTaxModel>>;

  @Field(type => Organization)
  @ManyToOne(type => Organization, organization => organization.recurringSalesInvoices, { nullable: false })
  organization: Promise<OrganizationModel>;

  @Field({nullable:true})
  @Column({nullable:true})
  cronPattern: string;
  @Field({nullable:true})
  @Column({nullable:true})
  lastDayInMonth: boolean;
  @Field()
  @Column()
  paymentTermInDays: number;

}

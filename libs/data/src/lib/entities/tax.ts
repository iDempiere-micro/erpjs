import { Column, Entity, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { TaxModel } from '@erpjs/model';
import { SalesInvoiceLine } from './sales.invoice.line';

@Entity()
@ObjectType()
export class Tax extends EntityBase implements TaxModel {
  @Column()
  @Field()
  displayName: string;

  @Column()
  @Field()
  ratePercent: number;

  @Field(type => [SalesInvoiceLine], { nullable: true })
  @OneToMany(type => SalesInvoiceLine, salesInvoiceLine => salesInvoiceLine.lineTax)
  salesInvoiceLine: Promise<Array<SalesInvoiceLine>>;
}

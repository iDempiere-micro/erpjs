import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { SalesInvoice } from "./SalesInvoice";
import { Tax } from "./Tax";
import { Product } from "./Product";
import { SalesInvoiceLineModel } from '../../lib/sales.invoice.line.model';
import { SalesInvoiceModel } from '../../lib/sales.invoice.model';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity("sales_invoice_line", { schema: "public" })
@ObjectType()
export class SalesInvoiceLine implements SalesInvoiceLineModel {
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

  @Column("integer", { name: "lineOrder" })
  @Field()
  lineOrder: number;

  @Column("double precision", { name: "linePrice" })
  @Field()
  linePrice: number;

  @Column("double precision", { name: "quantity" })
  @Field()
  quantity: number;

  @Column("character varying", { name: "narration" })
  @Field()
  narration: string;

  @ManyToOne(
    () => SalesInvoice,
    (salesInvoice) => salesInvoice.lines
  )
  @JoinColumn([{ name: "invoiceId", referencedColumnName: "id" }])
  invoice: SalesInvoiceModel;

  @ManyToOne(() => Tax, (tax) => tax.salesInvoiceLines)
  @JoinColumn([{ name: "lineTaxId", referencedColumnName: "id" }])
  lineTax: Tax;

  @ManyToOne(() => Product, (product) => product.salesInvoiceLines)
  @JoinColumn([{ name: "productId", referencedColumnName: "id" }])
  product: Product;
}

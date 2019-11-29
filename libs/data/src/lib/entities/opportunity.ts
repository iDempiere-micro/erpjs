import { CurrencyModel, OpportunityModel, ProductModel } from '@erpjs/model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Currency } from './currency';
import { Product } from './product';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

@Entity()
@ObjectType()
export class Opportunity extends UniqueDisplayEntityBase implements OpportunityModel {
  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  budget: number;
  @Field()
  @Column({type:'date'})
  closingDate: Date;
  @Field()
  @Column()
  company: string;
  @Field()
  @Column()
  email: string;
  @Field()
  @Column()
  phone: string;

  @Field(type => Currency)
  @ManyToOne(type => Currency, currency => currency.opportunities, { nullable: false })
  currency: Promise<CurrencyModel>;

  @Field(type => Product)
  @ManyToOne(type => Product, product => product.opportunities, { nullable: false })
  solution: Promise<ProductModel>;
}

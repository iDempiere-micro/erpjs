import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { CurrencyModel, LeadModel } from '@erpjs/model';
import { Currency } from './currency';
import { UniqueDisplayEntityBase } from './shared/unique.display.entity.base';

@Entity()
@ObjectType()
export class Lead extends UniqueDisplayEntityBase implements LeadModel {
  @Field({nullable: true})
  @Column({nullable: true})
  company: string;
  @Field()
  @Column()
  email: string;
  @Field({nullable: true})
  @Column({nullable: true})
  phone: string;

  @Column( {type: 'numeric', scale: 2, precision: 12})
  @Field()
  budget: number;

  @Field(type => Currency)
  @ManyToOne(type => Currency, currency => currency.leads, { nullable: false })
  currency: Promise<CurrencyModel>;

  @Field()
  @Column()
  expectedSolution: string;
  @Field()
  @Column()
  problemToSolve: string;
}

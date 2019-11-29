import { EntityBase } from './shared/EntityBase';
import { CurrencyModel, CurrencyRateModel } from '@erpjs/model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Currency } from './currency';

@Entity()
@ObjectType()
export class CurrencyRate extends EntityBase implements CurrencyRateModel {
  @Column( {type: 'float8'})
  @Field()
  currencyMultiplyingRate: number;
  @Column({type:'date'})
  @Field()
  end: Date;
  @Field(type => Currency)
  @ManyToOne(type => Currency, currency => currency.currencyRatesFrom, { nullable: false })
  from: Promise<CurrencyModel>;
  @Column({type:'date'})
  @Field()
  start: Date;
  @Field(type => Currency)
  @ManyToOne(type => Currency, currency => currency.currencyRatesTo, { nullable: false })
  to: Promise<CurrencyModel>;

  displayName = '';
}

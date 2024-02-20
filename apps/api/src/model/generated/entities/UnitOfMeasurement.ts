import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductModel } from '../../lib/product.model';
import { UnitOfMeasurementConversionModel } from '../../lib/unit.of.measurement.conversion.model';
import { UserModel } from '../../lib/user.model';
import { Product } from './Product';
import { UnitOfMeasurementConversion } from './UnitOfMeasurementConversion';
import { User } from './User';

@Entity('unit_of_measurement', { schema: 'public' })
@ObjectType()
export class UnitOfMeasurement {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  @Field()
  id: number;

  @Column('timestamp without time zone', {
    name: 'updtTs',
    default: () => 'now()',
  })
  updtTs: Date;

  @ManyToOne(() => User, (user) => user.updAccountingSchemes, {
    nullable: false,
    eager: true,
  })
  @JoinColumn([{ name: 'updtOpId', referencedColumnName: 'id' }])
  @Field(() => User)
  updtOp: UserModel;

  @Column('boolean', { name: 'isActive', default: () => 'true' })
  isActive: boolean;

  @Column('boolean', { name: 'isCurrent', default: () => 'true' })
  isCurrent: boolean;

  @Column('character varying', { name: 'displayName' })
  @Field()
  displayName: string;

  @OneToMany(
    () => UnitOfMeasurementConversion,
    (currencyRate) => currencyRate.from,
  )
  @Field(() => [UnitOfMeasurementConversion])
  conversionRates: UnitOfMeasurementConversionModel[]; // can convert to these

  @OneToMany(
    () => UnitOfMeasurementConversion,
    (currencyRate) => currencyRate.to,
  )
  @Field(() => [UnitOfMeasurementConversion])
  conversionRates2: UnitOfMeasurementConversionModel[]; // can be converted from those

  @OneToMany(() => Product, (accountingScheme) => accountingScheme.defaultUoM)
  products: ProductModel[];
}

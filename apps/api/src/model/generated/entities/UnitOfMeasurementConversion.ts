import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UnitOfMeasurementConversionModel } from '../../lib/unit.of.measurement.conversion.model';
import { UnitOfMeasurementModel } from '../../lib/unit.of.measurement.model';
import { UserModel } from '../../lib/user.model';
import { UnitOfMeasurement } from './UnitOfMeasurement';
import { User } from './User';

@Entity('unit_of_measurement_conversion', { schema: 'public' })
@ObjectType()
export class UnitOfMeasurementConversion
  implements UnitOfMeasurementConversionModel
{
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

  @Column('double precision', {
    name: 'currencyMultiplyingRate',
  })
  @Field()
  unitMultiplyingRate: number; // 1000

  @ManyToOne(() => UnitOfMeasurement, (currency) => currency.conversionRates)
  @JoinColumn([{ name: 'fromId', referencedColumnName: 'id' }])
  @Field(() => UnitOfMeasurement)
  from: UnitOfMeasurementModel; // m

  @ManyToOne(() => UnitOfMeasurement, (currency) => currency.conversionRates2)
  @JoinColumn([{ name: 'toId', referencedColumnName: 'id' }])
  @Field(() => UnitOfMeasurement)
  to: UnitOfMeasurementModel; // mm
}

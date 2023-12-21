import { BaseModel } from './base.model';
import { UnitOfMeasurementModel } from './unit.of.measurement.model';

export interface UnitOfMeasurementConversionModel extends BaseModel {
  from: UnitOfMeasurementModel; // m
  to: UnitOfMeasurementModel; // mm
  unitMultiplyingRate: number; // 1 m = 1000mm
}

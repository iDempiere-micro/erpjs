import { BaseModel } from './base.model';
import { UnitOfMeasurementModel } from './unit.of.measurement.model';
import { BaseSaveArgsModel } from './base.save.args.model';

export interface UnitOfMeasurementConversionSaveArgsModel
  extends BaseSaveArgsModel {
  fromUoMId: number; // m
  toUoMId: number; // mm
  currencyMultiplyingRate: number; // 1 m = 1000mm
}

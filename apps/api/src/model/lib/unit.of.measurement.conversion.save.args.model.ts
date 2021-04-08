import { BaseSaveArgsModel } from './base.save.args.model';

export interface UnitOfMeasurementConversionSaveArgsModel
  extends BaseSaveArgsModel {
  fromUoMId: number; // m
  toUoMId: number; // mm
  unitMultiplyingRate: number; // 1 m = 1000mm
}

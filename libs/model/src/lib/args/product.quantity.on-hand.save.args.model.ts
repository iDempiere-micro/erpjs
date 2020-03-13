import { ProductMovementModel } from '../helpers/product.movement.model';
import { BaseSaveArgsModel } from './base.save.args.model';

export interface ProductQuantityOnHandSaveArgsModel extends BaseSaveArgsModel {
  productMovement: ProductMovementModel
}

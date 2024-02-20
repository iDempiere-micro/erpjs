import { Field, InputType, Int } from '@nestjs/graphql';
import { FactoringContractSaveArgsModel } from '../../model';
import { BaseSaveArgs } from './base.save.args';

@InputType()
export class FactoringContractSaveArgs
  extends BaseSaveArgs
  implements FactoringContractSaveArgsModel
{
  @Field(() => Int)
  factoringProviderId: number;
  @Field(() => Int)
  customerId: number;
  @Field(() => Int)
  organizationId: number;
  @Field()
  invoicePrintNote: string;
}

import { Field, InputType, Int } from '@nestjs/graphql';
import { BaseSaveArgs } from './base.save.args';
import { FactoringContractSaveArgsModel } from '../../model';

@InputType()
export class FactoringContractSaveArgs extends BaseSaveArgs
  implements FactoringContractSaveArgsModel {
  @Field(() => Int)
  factoringProviderId: number;
  @Field(() => Int)
  customerId: number;
  @Field(() => Int)
  organizationId: number;
  @Field()
  invoicePrintNote: string;
}

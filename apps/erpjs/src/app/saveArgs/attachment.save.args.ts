import { AttachmentSaveArgsModel } from '../../model/lib/attachment.save.args.model';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AttachmentSaveArgs implements AttachmentSaveArgsModel {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field()
  displayName: string;
}

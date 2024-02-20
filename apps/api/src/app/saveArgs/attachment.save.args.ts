import { Field, InputType } from '@nestjs/graphql';
import { AttachmentSaveArgsModel } from '../../model/lib/attachment.save.args.model';

@InputType()
export class AttachmentSaveArgs implements AttachmentSaveArgsModel {
  @Field(() => String, { nullable: true })
  id?: string;
  @Field()
  displayName: string;
}

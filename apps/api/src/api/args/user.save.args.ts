import { BaseSaveArgs } from './base.save.args';
import { UserSaveArgsModel } from '@erpjs/model';
import { InputType } from 'type-graphql';

@InputType()
export class UserSaveArgs extends BaseSaveArgs implements UserSaveArgsModel {}

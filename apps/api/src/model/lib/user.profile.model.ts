import { UserProfileModelIdentity } from './user.profile.model.identity';

export interface UserProfileModel {
  email?: string;
  identities?: Array<UserProfileModelIdentity>;
  name?: string;
  user_id?: string;
}

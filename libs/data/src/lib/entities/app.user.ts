import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { UserModel } from '@erpjs/model';
import { UserIdentity } from './user.identity';
import { UserToOrganization } from './user.to.organization';

@Entity()
@ObjectType()
export class AppUser extends EntityBase implements UserModel<AppUser> {
  get displayName() { return name; }

  @Index({unique: true})
  @Field({nullable: true})
  @Column({nullable: true})
  email?: string;

  @Index({unique: true})
  @Field({nullable: true})
  @Column({nullable: true})
  username?: string;

  @Index({unique: true})
  @Field({nullable: true})
  @Column({nullable: true})
  name?: string;

  @Field(type => [UserIdentity], { nullable: true })
  @OneToMany(type => UserIdentity, userIdentity => userIdentity.user)
  identities: Promise<Array<UserIdentity>>;

  @Field(type => [UserToOrganization], { nullable: true })
  @OneToMany(type => UserToOrganization, userToOrganization => userToOrganization.user)
  organizations: Promise<Array<UserToOrganization>>;
}

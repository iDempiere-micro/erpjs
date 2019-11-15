import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { UserIdentityModel, UserModel } from '@erpjs/model';
import { AppUser } from './app.user';

@Entity()
@ObjectType()
export class UserIdentity extends EntityBase implements UserIdentityModel {
  @Index({unique: true})
  @Column()
  @Field()
  externalUser: string;

  @Index()
  @Column()
  @Field()
  provider: string;

  @Field(type => AppUser)
  @ManyToOne(type => AppUser, user => user.identities, { nullable: false })
  user: Promise<UserModel>;

  get displayName() { return `${this.provider}-${this.externalUser}`; };
}

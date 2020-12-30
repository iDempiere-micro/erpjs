import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { UserModel } from '../../lib/user.model';

@Index("IDX_c555c4388d24da3c6fa22d85bd", ["externalUser"], { unique: true })
@Index("IDX_1c243d6d65f07e169d53a69ea0", ["provider"], {})
@Entity("user_identity", { schema: "public" })
export class UserIdentity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("timestamp without time zone", {
    name: "updtTs",
    default: () => "now()",
  })
  updtTs: Date;

  @Column("integer", { name: "updtOpId", default: () => "0" })
  updtOpId: number;

  @Column("boolean", { name: "isActive", default: () => "true" })
  isActive: boolean;

  @Column("boolean", { name: "isCurrent", default: () => "true" })
  isCurrent: boolean;

  @Column("character varying", { name: "externalUser" })
  externalUser: string;

  @Column("character varying", { name: "provider" })
  provider: string;

  @ManyToOne(() => User, (user) => user.identities, {eager: true})
  @JoinColumn([{ name: "userId", referencedColumnName: "id" }])
  user: UserModel;
}

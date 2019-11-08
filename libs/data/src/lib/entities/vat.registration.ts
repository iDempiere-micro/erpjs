import { Column, Entity, ManyToOne } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { EntityBase } from './shared/EntityBase';
import { OrganizationModel, VatRegistrationModel } from '@erpjs/model';
import { Country } from './country';
import { Organization } from './organization';

@Entity()
@ObjectType()
export class VatRegistration extends EntityBase implements VatRegistrationModel {
  get displayName(): string {
    return `${this.start} - ${this.vatNumber} - ${this.end}`;
  }

  @Field(type => Country)
  @ManyToOne(type => Country, country => country.vatRegistrations, { nullable: false })
  registeredIn: Promise<Country>;

  @Field(type => Organization)
  @ManyToOne(type => Organization, organization => organization.vatRegistrations, { nullable: false })
  registeredFor: Promise<OrganizationModel>;

  @Column({type:'date'})
  @Field()
  start: Date;

  @Column()
  @Field()
  vatNumber: string;

  @Column({type:'date', nullable: true})
  @Field({nullable: true})
  end?: Date;
}

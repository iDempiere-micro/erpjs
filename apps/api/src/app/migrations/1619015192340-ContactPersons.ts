import { MigrationInterface, QueryRunner } from 'typeorm';

export class ContactPersons1619015192340 implements MigrationInterface {
  name = 'ContactPersons1619015192340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."contactPerson" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "updtOpId" integer NOT NULL, CONSTRAINT "PK_746d8d620b9adb89ccb008773a9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7491b9b65ea315845dd61b1856" ON "public"."contactPerson" ("firstName") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ab57dcc04929b28b4d8479188d" ON "public"."contactPerson" ("lastName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."contactPersonCompanyRelation" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "role" character varying NOT NULL, "updtOpId" integer NOT NULL, "contactPersonId" integer NOT NULL, "customerId" integer NOT NULL, CONSTRAINT "PK_226ddfd36a0811c0768c3be1b12" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD "www" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD "publicNote" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD "photo" bytea`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b21b8a7c8801bb8602ec940fec" ON "public"."customerPriceList" ("validFrom") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ed822f2a7e9f63b68877e9fce5" ON "public"."customerPriceList" ("validTo") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."contactPerson" ADD CONSTRAINT "FK_7a7ffd15ebe52dd8fc1d33cb50f" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."contactPersonCompanyRelation" ADD CONSTRAINT "FK_1cd288d466509367bff77d9d1d6" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."contactPersonCompanyRelation" ADD CONSTRAINT "FK_bfd00884d3dc28191b0d5645de9" FOREIGN KEY ("contactPersonId") REFERENCES "public"."contactPerson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."contactPersonCompanyRelation" ADD CONSTRAINT "FK_19a8fde957b82c65cf17413ab5e" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."contactPersonCompanyRelation" DROP CONSTRAINT "FK_19a8fde957b82c65cf17413ab5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."contactPersonCompanyRelation" DROP CONSTRAINT "FK_bfd00884d3dc28191b0d5645de9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."contactPersonCompanyRelation" DROP CONSTRAINT "FK_1cd288d466509367bff77d9d1d6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."contactPerson" DROP CONSTRAINT "FK_7a7ffd15ebe52dd8fc1d33cb50f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ed822f2a7e9f63b68877e9fce5"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b21b8a7c8801bb8602ec940fec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP COLUMN "photo"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP COLUMN "publicNote"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP COLUMN "www"`,
    );
    await queryRunner.query(
      `DROP TABLE "public"."contactPersonCompanyRelation"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ab57dcc04929b28b4d8479188d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7491b9b65ea315845dd61b1856"`,
    );
    await queryRunner.query(`DROP TABLE "public"."contactPerson"`);
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class EnhanceCustomer1615749063579 implements MigrationInterface {
  name = 'EnhanceCustomer1615749063579';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD COLUMN IF NOT EXISTS "note" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD COLUMN IF NOT EXISTS "addressId" integer`,
    );

    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP CONSTRAINT IF EXISTS "FK_2c1aeb39925d1e1ace946ca2f21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD CONSTRAINT "FK_2c1aeb39925d1e1ace946ca2f21" FOREIGN KEY ("addressId") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP CONSTRAINT "FK_2c1aeb39925d1e1ace946ca2f21"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP COLUMN "addressId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP COLUMN "note"`,
    );
  }
}

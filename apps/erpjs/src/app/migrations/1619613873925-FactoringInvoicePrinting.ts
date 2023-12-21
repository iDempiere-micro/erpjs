import { MigrationInterface, QueryRunner } from 'typeorm';

export class FactoringInvoicePrinting1619613873925
  implements MigrationInterface {
  name = 'FactoringInvoicePrinting1619613873925';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."factoringContract" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "invoicePrintNote" character varying NOT NULL, "updtOpId" integer NOT NULL, "factoringProviderId" integer NOT NULL, "customerId" integer NOT NULL, "currencyId" integer NOT NULL, CONSTRAINT "PK_033bc754511e1929542eb1cc9b5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD "printNote" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringContract" ADD CONSTRAINT "FK_6f40d42ccc7ea435721230ba807" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringContract" ADD CONSTRAINT "FK_41fe90ab93d40cd55e282ce7b2b" FOREIGN KEY ("factoringProviderId") REFERENCES "public"."factoringProvider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringContract" ADD CONSTRAINT "FK_145c1881c0aa4bf2158d1bee85b" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringContract" ADD CONSTRAINT "FK_7d7e1db5908c7bc4ae9425f02a8" FOREIGN KEY ("currencyId") REFERENCES "public"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."factoringContract" DROP CONSTRAINT "FK_7d7e1db5908c7bc4ae9425f02a8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringContract" DROP CONSTRAINT "FK_145c1881c0aa4bf2158d1bee85b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringContract" DROP CONSTRAINT "FK_41fe90ab93d40cd55e282ce7b2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringContract" DROP CONSTRAINT "FK_6f40d42ccc7ea435721230ba807"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ALTER COLUMN "updtOpId" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP COLUMN "printNote"`,
    );
    await queryRunner.query(`DROP TABLE "public"."factoringContract"`);
  }
}

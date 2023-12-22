import { MigrationInterface, QueryRunner } from 'typeorm';

export class FactoringProvider1619502927022 implements MigrationInterface {
  name = 'FactoringProvider1619502927022';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."factoringProvider" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "contact" character varying NOT NULL, "legalName" character varying NOT NULL, "updtOpId" integer NOT NULL, "bankAccountId" integer NOT NULL, CONSTRAINT "PK_ca17af38def58bfa19b841c7b81" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_factoringProvider_displayName" ON "public"."factoringProvider" ("displayName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD "factoringProviderId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringProvider" ADD CONSTRAINT "FK_4b1f9a1d9f45356e49a27fac7c7" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringProvider" ADD CONSTRAINT "FK_e616221fe300ca7ceb6e2bd4ead" FOREIGN KEY ("bankAccountId") REFERENCES "public"."bank_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD CONSTRAINT "FK_42e3f89cee2b09200cc0df70877" FOREIGN KEY ("factoringProviderId") REFERENCES "public"."factoringProvider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP CONSTRAINT "FK_42e3f89cee2b09200cc0df70877"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringProvider" DROP CONSTRAINT "FK_e616221fe300ca7ceb6e2bd4ead"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."factoringProvider" DROP CONSTRAINT "FK_4b1f9a1d9f45356e49a27fac7c7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP COLUMN "factoringProviderId"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_factoringProvider_displayName"`,
    );
    await queryRunner.query(`DROP TABLE "public"."factoringProvider"`);
  }
}

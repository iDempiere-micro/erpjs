import { MigrationInterface, QueryRunner } from 'typeorm';

export class UoM1616228731111 implements MigrationInterface {
  name = 'UoM1616228731111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "public"."unit_of_measurement_conversion" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "currencyMultiplyingRate" double precision NOT NULL, "end" date NOT NULL, "start" date NOT NULL, "updtOpId" integer NOT NULL, "fromId" integer, "toId" integer, CONSTRAINT "PK_f8796ed806b216628b252bb3b4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "public"."unit_of_measurement" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "updtOpId" integer NOT NULL, CONSTRAINT "PK_f64cb86b321fc095bde6961d6da" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD COLUMN IF NOT EXISTS "uomId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."unit_of_measurement_conversion" ADD CONSTRAINT "FK_53f53a57b0fff0f3c38030480c6" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."unit_of_measurement_conversion" ADD CONSTRAINT "FK_db4c477e0fb35dfae056eafa13d" FOREIGN KEY ("fromId") REFERENCES "public"."unit_of_measurement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."unit_of_measurement_conversion" ADD CONSTRAINT "FK_7e0d7a2652d946896736a520b2b" FOREIGN KEY ("toId") REFERENCES "public"."unit_of_measurement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."unit_of_measurement" ADD CONSTRAINT "FK_99cd4cf812d980868a774fd004b" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD CONSTRAINT "FK_b05df001c34be0b2afa54b36a1b" FOREIGN KEY ("uomId") REFERENCES "public"."unit_of_measurement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP CONSTRAINT "FK_b05df001c34be0b2afa54b36a1b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."unit_of_measurement" DROP CONSTRAINT "FK_99cd4cf812d980868a774fd004b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."unit_of_measurement_conversion" DROP CONSTRAINT "FK_7e0d7a2652d946896736a520b2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."unit_of_measurement_conversion" DROP CONSTRAINT "FK_db4c477e0fb35dfae056eafa13d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."unit_of_measurement_conversion" DROP CONSTRAINT "FK_53f53a57b0fff0f3c38030480c6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP COLUMN "uomId"`,
    );
    await queryRunner.query(`DROP TABLE "public"."unit_of_measurement"`);
    await queryRunner.query(
      `DROP TABLE "public"."unit_of_measurement_conversion"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class Attachment1620312048836 implements MigrationInterface {
  name = 'Attachment1620312048836';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."attachment" ("id" SERIAL NOT NULL, "contentUrl" character varying NOT NULL, "displayName" character varying NOT NULL, CONSTRAINT "PK_9f047896764a10a0ade3514ccf0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8c1dfd4ae09dd3235f2503f2cf" ON "public"."attachment" ("contentUrl") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_10f262acf59123ffde85b5065e" ON "public"."attachment" ("displayName") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_10f262acf59123ffde85b5065e"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8c1dfd4ae09dd3235f2503f2cf"`,
    );
  }
}

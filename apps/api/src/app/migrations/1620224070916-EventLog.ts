import { MigrationInterface, QueryRunner } from 'typeorm';

export class EventLog1620224070916 implements MigrationInterface {
  name = 'EventLog1620224070916';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."eventLog" ("id" SERIAL NOT NULL, "content" jsonb NOT NULL, "displayName" character varying NOT NULL, CONSTRAINT "PK_6a6f72eac8c1a2099e1df9786bb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2b1a40ada41ba1d1eff5143185" ON "public"."eventLog" ("displayName") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_2b1a40ada41ba1d1eff5143185"`,
    );
    await queryRunner.query(`DROP TABLE "public"."eventLog"`);
  }
}

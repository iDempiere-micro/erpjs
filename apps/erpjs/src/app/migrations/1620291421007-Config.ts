import { MigrationInterface, QueryRunner } from 'typeorm';

export class Config1620291421007 implements MigrationInterface {
  name = 'Config1620291421007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."config" ("id" SERIAL NOT NULL, "content" jsonb NOT NULL, "displayName" character varying NOT NULL, CONSTRAINT "PK_7839f7dd8f45e37933fb3e35cbb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a6e5cc808398e62bdcebad076f" ON "public"."config" ("displayName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" ALTER COLUMN "updtOpId" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a6e5cc808398e62bdcebad076f"`,
    );
    await queryRunner.query(`DROP TABLE "public"."config"`);
  }
}

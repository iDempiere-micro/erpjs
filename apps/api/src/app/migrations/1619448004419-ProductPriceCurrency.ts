import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductPriceCurrency1619448004419 implements MigrationInterface {
    name = 'ProductPriceCurrency1619448004419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."customerProductPrice" ADD "currencyId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."customerProductPrice" ADD CONSTRAINT "FK_0feeda1e15d57b1b8c69ba679c8" FOREIGN KEY ("currencyId") REFERENCES "public"."currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."customerProductPrice" DROP CONSTRAINT "FK_0feeda1e15d57b1b8c69ba679c8"`);
        await queryRunner.query(`ALTER TABLE "public"."customerProductPrice" DROP COLUMN "currencyId"`);
    }

}

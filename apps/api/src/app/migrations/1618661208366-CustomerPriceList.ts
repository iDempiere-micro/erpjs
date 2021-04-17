import {MigrationInterface, QueryRunner} from "typeorm";

export class CustomerPriceList1618661208366 implements MigrationInterface {
    name = 'CustomerPriceList1618661208366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "public"."customerProductPrice" ("id" SERIAL NOT NULL, "sellingPrice" numeric(12,2) NOT NULL, "productId" integer NOT NULL, "customerPriceListId" integer NOT NULL, CONSTRAINT "PK_41712b48577a11adfdbb81efdf9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "public"."customerPriceList" ("id" SERIAL NOT NULL, "displayName" character varying NOT NULL, "validFrom" TIMESTAMP, "validTo" TIMESTAMP, "customerGroupId" integer NOT NULL, CONSTRAINT "PK_3a410c80620c92c128634387f20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_customerPriceList_displayName" ON "public"."customerPriceList" ("displayName") `);
        await queryRunner.query(`CREATE TABLE "public"."customerGroup" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "updtOpId" integer NOT NULL, CONSTRAINT "PK_2f921748bb8e683b3d7007182ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_customerGroup_displayName" ON "public"."customerGroup" ("displayName") `);
        await queryRunner.query(`ALTER TABLE "public"."unit_of_measurement_conversion" DROP COLUMN IF EXISTS "end"`);
        await queryRunner.query(`ALTER TABLE "public"."unit_of_measurement_conversion" DROP COLUMN IF EXISTS "start"`);
        await queryRunner.query(`ALTER TABLE "public"."customer" ADD "customerGroupId" integer`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "updtOpId" SET DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE "public"."customerProductPrice" ADD CONSTRAINT "FK_51fd886ac463154b1fb68ad944a" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."customerProductPrice" ADD CONSTRAINT "FK_5fad018dfcf766b9fab575e5ea1" FOREIGN KEY ("customerPriceListId") REFERENCES "public"."customerPriceList"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."customerPriceList" ADD CONSTRAINT "FK_635c71f6ed02473cca6603a3079" FOREIGN KEY ("customerGroupId") REFERENCES "public"."customerGroup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."customerGroup" ADD CONSTRAINT "FK_6622e70e814cce558a98043c611" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."customer" ADD CONSTRAINT "FK_07b06500ab5d46137b7f87cc53c" FOREIGN KEY ("customerGroupId") REFERENCES "public"."customerGroup"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."customer" DROP CONSTRAINT "FK_07b06500ab5d46137b7f87cc53c"`);
        await queryRunner.query(`ALTER TABLE "public"."customerGroup" DROP CONSTRAINT "FK_6622e70e814cce558a98043c611"`);
        await queryRunner.query(`ALTER TABLE "public"."customerPriceList" DROP CONSTRAINT "FK_635c71f6ed02473cca6603a3079"`);
        await queryRunner.query(`ALTER TABLE "public"."customerProductPrice" DROP CONSTRAINT "FK_5fad018dfcf766b9fab575e5ea1"`);
        await queryRunner.query(`ALTER TABLE "public"."customerProductPrice" DROP CONSTRAINT "FK_51fd886ac463154b1fb68ad944a"`);
        await queryRunner.query(`ALTER TABLE "public"."user" ALTER COLUMN "updtOpId" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "public"."customer" DROP COLUMN "customerGroupId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_customerGroup_displayName"`);
        await queryRunner.query(`DROP TABLE "public"."customerGroup"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_customerPriceList_displayName"`);
        await queryRunner.query(`DROP TABLE "public"."customerPriceList"`);
        await queryRunner.query(`DROP TABLE "public"."customerProductPrice"`);
    }

}

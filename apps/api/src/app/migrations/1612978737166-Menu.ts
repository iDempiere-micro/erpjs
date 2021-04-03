import { MigrationInterface, QueryRunner } from 'typeorm';

export class Menu1612978737166 implements MigrationInterface {
  name = 'Menu1612978737166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."menu_item" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "to" character varying NOT NULL, "updtOpId" integer NOT NULL, "menuId" integer NOT NULL, CONSTRAINT "PK_c48762823cdf1c634f295d57b44" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_displayName_menuItem" ON "public"."menu_item" ("displayName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."menu" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "updtOpId" integer NOT NULL, CONSTRAINT "PK_e81673826c4a73969969211789e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_displayName_menu" ON "public"."menu" ("displayName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_identity" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."document_number_sequence" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."bank" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."country" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" DROP CONSTRAINT "FK_119e6dc00cb0db3abe3ef377c36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" ALTER COLUMN "countryId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP CONSTRAINT "FK_b27f376ebf341d1c03042b81f5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ALTER COLUMN "legalAddressId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tax" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" DROP CONSTRAINT "FK_46e2135df8a294a44f6da9cfb24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" DROP CONSTRAINT "FK_aa6a84182838c767209e1c4b5f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ALTER COLUMN "lineTaxId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ALTER COLUMN "productId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_vat" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP CONSTRAINT "FK_61c1b2dd43ab2831c70d94d6fc6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP CONSTRAINT "FK_7844e9c13be9fa7778663eb0d3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP CONSTRAINT "FK_7391d1afd7eb40616c692823442"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP CONSTRAINT "FK_e2a141391f5b4fb5722bb8cb913"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ALTER COLUMN "bankAccountId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ALTER COLUMN "currencyId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ALTER COLUMN "customerId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ALTER COLUMN "organizationId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."bank_account" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" DROP CONSTRAINT "FK_b946d2f195d40cb30083b9517f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" DROP CONSTRAINT "FK_9a7bc74400d2578ff8756e7ffe6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" DROP CONSTRAINT "FK_cf4bbe282c254f5dcda235d6cfc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ALTER COLUMN "accountingSchemeId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ALTER COLUMN "bankAccountId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ALTER COLUMN "legalAddressId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_to_organization" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency_rate" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."language" ALTER COLUMN "updtOpId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_identity" ADD CONSTRAINT "FK_e5970daf7641570b80b3fe9689f" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."document_number_sequence" ADD CONSTRAINT "FK_0ef6b9526e2954e4d17ecb39aba" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."bank" ADD CONSTRAINT "FK_b9853ae5b61d73d2f863bf31d48" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."country" ADD CONSTRAINT "FK_a6101aa2f56b1bf9c88557b812f" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" ADD CONSTRAINT "FK_502db82dc7ad211cafc115c6351" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" ADD CONSTRAINT "FK_119e6dc00cb0db3abe3ef377c36" FOREIGN KEY ("countryId") REFERENCES "public"."country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD CONSTRAINT "FK_d5969b09d176287a016268ee034" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD CONSTRAINT "FK_b27f376ebf341d1c03042b81f5e" FOREIGN KEY ("legalAddressId") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tax" ADD CONSTRAINT "FK_c42beaa389fabca57aa41f0376d" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ADD CONSTRAINT "FK_1fc1f0597e11e7825f4161527a3" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ADD CONSTRAINT "FK_5b01332baf0d17bd34186acd3d3" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ADD CONSTRAINT "FK_46e2135df8a294a44f6da9cfb24" FOREIGN KEY ("lineTaxId") REFERENCES "public"."tax"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ADD CONSTRAINT "FK_aa6a84182838c767209e1c4b5f2" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_vat" ADD CONSTRAINT "FK_7644fc71ac845df8fd817fdd704" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD CONSTRAINT "FK_61c1b2dd43ab2831c70d94d6fc6" FOREIGN KEY ("bankAccountId") REFERENCES "public"."bank_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD CONSTRAINT "FK_7844e9c13be9fa7778663eb0d3d" FOREIGN KEY ("currencyId") REFERENCES "public"."currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD CONSTRAINT "FK_7391d1afd7eb40616c692823442" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD CONSTRAINT "FK_e2a141391f5b4fb5722bb8cb913" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."bank_account" ADD CONSTRAINT "FK_5f05f3d209e4657e92e4cbe7c61" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ADD CONSTRAINT "FK_7677b90e4b19af4d1078afa6b6f" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ADD CONSTRAINT "FK_b946d2f195d40cb30083b9517f9" FOREIGN KEY ("accountingSchemeId") REFERENCES "public"."accounting_scheme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ADD CONSTRAINT "FK_9a7bc74400d2578ff8756e7ffe6" FOREIGN KEY ("bankAccountId") REFERENCES "public"."bank_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ADD CONSTRAINT "FK_cf4bbe282c254f5dcda235d6cfc" FOREIGN KEY ("legalAddressId") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_to_organization" ADD CONSTRAINT "FK_c945c66ec5631bafa1a01cd0a45" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency_rate" ADD CONSTRAINT "FK_5957131a30f05f2b202bc9191c0" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency" ADD CONSTRAINT "FK_949ebbd51b89cf4830be3e9b53a" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."language" ADD CONSTRAINT "FK_41ef69941825cbeb66517533b37" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."menu_item" ADD CONSTRAINT "FK_6aa67e8642a83d87bdda69966e6" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."menu_item" ADD CONSTRAINT "FK_956a0060ab9c15477458e3925f2" FOREIGN KEY ("menuId") REFERENCES "public"."menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."menu" ADD CONSTRAINT "FK_93f7bfe23acd89729f08a37d57d" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."menu" DROP CONSTRAINT "FK_93f7bfe23acd89729f08a37d57d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."menu_item" DROP CONSTRAINT "FK_956a0060ab9c15477458e3925f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."menu_item" DROP CONSTRAINT "FK_6aa67e8642a83d87bdda69966e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."language" DROP CONSTRAINT "FK_41ef69941825cbeb66517533b37"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency" DROP CONSTRAINT "FK_949ebbd51b89cf4830be3e9b53a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency_rate" DROP CONSTRAINT "FK_5957131a30f05f2b202bc9191c0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_to_organization" DROP CONSTRAINT "FK_c945c66ec5631bafa1a01cd0a45"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" DROP CONSTRAINT "FK_cf4bbe282c254f5dcda235d6cfc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" DROP CONSTRAINT "FK_9a7bc74400d2578ff8756e7ffe6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" DROP CONSTRAINT "FK_b946d2f195d40cb30083b9517f9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" DROP CONSTRAINT "FK_7677b90e4b19af4d1078afa6b6f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."bank_account" DROP CONSTRAINT "FK_5f05f3d209e4657e92e4cbe7c61"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP CONSTRAINT "FK_e2a141391f5b4fb5722bb8cb913"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP CONSTRAINT "FK_7391d1afd7eb40616c692823442"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP CONSTRAINT "FK_7844e9c13be9fa7778663eb0d3d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" DROP CONSTRAINT "FK_61c1b2dd43ab2831c70d94d6fc6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_vat" DROP CONSTRAINT "FK_7644fc71ac845df8fd817fdd704"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" DROP CONSTRAINT "FK_aa6a84182838c767209e1c4b5f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" DROP CONSTRAINT "FK_46e2135df8a294a44f6da9cfb24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" DROP CONSTRAINT "FK_5b01332baf0d17bd34186acd3d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" DROP CONSTRAINT "FK_1fc1f0597e11e7825f4161527a3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tax" DROP CONSTRAINT "FK_c42beaa389fabca57aa41f0376d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP CONSTRAINT "FK_b27f376ebf341d1c03042b81f5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP CONSTRAINT "FK_d5969b09d176287a016268ee034"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" DROP CONSTRAINT "FK_119e6dc00cb0db3abe3ef377c36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" DROP CONSTRAINT "FK_502db82dc7ad211cafc115c6351"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."country" DROP CONSTRAINT "FK_a6101aa2f56b1bf9c88557b812f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."bank" DROP CONSTRAINT "FK_b9853ae5b61d73d2f863bf31d48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."document_number_sequence" DROP CONSTRAINT "FK_0ef6b9526e2954e4d17ecb39aba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_identity" DROP CONSTRAINT "FK_e5970daf7641570b80b3fe9689f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."language" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency_rate" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_to_organization" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ALTER COLUMN "legalAddressId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ALTER COLUMN "bankAccountId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ALTER COLUMN "accountingSchemeId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ADD CONSTRAINT "FK_cf4bbe282c254f5dcda235d6cfc" FOREIGN KEY ("legalAddressId") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ADD CONSTRAINT "FK_9a7bc74400d2578ff8756e7ffe6" FOREIGN KEY ("bankAccountId") REFERENCES "public"."bank_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."organization" ADD CONSTRAINT "FK_b946d2f195d40cb30083b9517f9" FOREIGN KEY ("accountingSchemeId") REFERENCES "public"."accounting_scheme"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."bank_account" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ALTER COLUMN "organizationId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ALTER COLUMN "customerId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ALTER COLUMN "currencyId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ALTER COLUMN "bankAccountId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD CONSTRAINT "FK_e2a141391f5b4fb5722bb8cb913" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD CONSTRAINT "FK_7391d1afd7eb40616c692823442" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD CONSTRAINT "FK_7844e9c13be9fa7778663eb0d3d" FOREIGN KEY ("currencyId") REFERENCES "public"."currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD CONSTRAINT "FK_61c1b2dd43ab2831c70d94d6fc6" FOREIGN KEY ("bankAccountId") REFERENCES "public"."bank_account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_vat" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ALTER COLUMN "productId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ALTER COLUMN "lineTaxId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ADD CONSTRAINT "FK_aa6a84182838c767209e1c4b5f2" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ADD CONSTRAINT "FK_46e2135df8a294a44f6da9cfb24" FOREIGN KEY ("lineTaxId") REFERENCES "public"."tax"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."tax" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ALTER COLUMN "legalAddressId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD CONSTRAINT "FK_b27f376ebf341d1c03042b81f5e" FOREIGN KEY ("legalAddressId") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" ALTER COLUMN "countryId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" ADD CONSTRAINT "FK_119e6dc00cb0db3abe3ef377c36" FOREIGN KEY ("countryId") REFERENCES "public"."country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."country" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."bank" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."document_number_sequence" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_identity" ALTER COLUMN "updtOpId" SET DEFAULT 0`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_displayName_menu"`);
    await queryRunner.query(`DROP TABLE "public"."menu"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_displayName_menuItem"`);
    await queryRunner.query(`DROP TABLE "public"."menu_item"`);
  }
}

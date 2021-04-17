import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDB1595508635320 implements MigrationInterface {
  name = 'CreateDB1595508635320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "public"."currency_rate" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "currencyMultiplyingRate" double precision NOT NULL, "end" date NOT NULL, "start" date NOT NULL, "fromId" integer, "toId" integer, CONSTRAINT "PK_3a2814e7c859ab225ff61369f06" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."bank" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "bankIdentifierCode" character varying NOT NULL, CONSTRAINT "PK_80fb8d595e2cd27c4131c68f5d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_1930777e62854add6a64f50d42" ON "public"."bank" ("displayName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."document_number_sequence" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "forType" character varying NOT NULL, "current" integer NOT NULL, "organizationId" integer, CONSTRAINT "PK_4cefcadc7d07e1b79c1ddb07873" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."country" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "isoCode" character varying NOT NULL, CONSTRAINT "UQ_0460c7a81bca1f3f2fc6fbf99d6" UNIQUE ("isoCode"), CONSTRAINT "PK_f1e41a6df5739da5ceefdbd5a1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "UQ_6eba1a52ee121d100c8a0a6510c" ON "public"."country" ("isoCode") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_06db3c87e9e1b9eba96918b308" ON "public"."country" ("displayName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."customer" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "legalName" character varying NOT NULL, "vatNumber" character varying, "invoicingEmail" character varying NOT NULL, "idNumber" character varying NOT NULL, "legalAddressId" integer, "note" character varying, "addressId" integer, CONSTRAINT "PK_493862f6fb77845712126f204eb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_a843215c5e375894bcd5bdf24a" ON "public"."customer" ("vatNumber") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_71b54ec7502c83c7f503f57c64" ON "public"."customer" ("legalName") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_df529c45726940beb548906481" ON "public"."customer" ("displayName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."address" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "line1" character varying NOT NULL, "city" character varying NOT NULL, "zipCode" character varying NOT NULL, "countryId" integer, CONSTRAINT "PK_3d1e15b90ff2a5f2bfc431c6bdd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."user_identity" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "externalUser" character varying NOT NULL, "provider" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_9d675c36942ef9b6b83b7e28c2c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1c243d6d65f07e169d53a69ea0" ON "public"."user_identity" ("provider") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_c555c4388d24da3c6fa22d85bd" ON "public"."user_identity" ("externalUser") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."user" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "email" character varying, "username" character varying, "name" character varying, CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_78a916df40e02a9deb1c4b75ed" ON "public"."user" ("username") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_065d4d8f3b5adb4a08841eae3c" ON "public"."user" ("name") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "public"."user" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."user_to_organization" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "organizationId" integer, "userId" integer, CONSTRAINT "PK_5837964dbf6c88bec81754234bf" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."organization" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "contact" character varying NOT NULL, "legalName" character varying NOT NULL, "registration" character varying NOT NULL, "idNumber" character varying NOT NULL, "vatNumber" character varying, "accountingSchemeId" integer, "bankAccountId" integer, "legalAddressId" integer, CONSTRAINT "PK_ff95b434170f261599540276497" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_99ecb4de1fda7ee51fb91b3055" ON "public"."organization" ("vatNumber") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_4177d3499a2c7edb42ead3d916" ON "public"."organization" ("displayName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."bank_account" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "iban" character varying NOT NULL, "swift" character varying NOT NULL, "bankAccountCustomerPrintableNumber" character varying NOT NULL, "bankId" integer, CONSTRAINT "PK_7fb97b7c8d90387687697cebd5f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_d13847b5db0cf66c1ea23615eb" ON "public"."bank_account" ("displayName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."tax" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "ratePercent" integer NOT NULL, "isStandard" boolean NOT NULL, CONSTRAINT "PK_5437f933e5996c78821d7b777a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."product" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "sku" character varying NOT NULL, "uomId" integer, CONSTRAINT "PK_da169ec9c2ae25fb86633d10f9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_34f6ca1cd897cc926bdcca1ca3" ON "public"."product" ("sku") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_826d69dcc65d9650be67af6d48" ON "public"."product" ("displayName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."sales_invoice_line" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "lineOrder" integer NOT NULL, "linePrice" double precision NOT NULL, "quantity" double precision NOT NULL, "narration" character varying NOT NULL, "invoiceId" integer, "lineTaxId" integer, "productId" integer, CONSTRAINT "PK_ae0c4e44242436d0191b61f435c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."sales_invoice_vat" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "vatRatePercent" numeric(12,2) NOT NULL, "vatTotalAccountingSchemeCurrencyRaw" double precision NOT NULL, "vatTotalRaw" double precision NOT NULL, "vatTotalAccountingSchemeCurrency" numeric(12,2) NOT NULL, "vatTotal" numeric(12,2) NOT NULL, "invoiceId" integer, CONSTRAINT "PK_471ba7a8a07f52d011c765d239a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."sales_invoice" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "dueDate" date NOT NULL, "issuedOn" date NOT NULL, "documentNo" character varying, "isDraft" boolean NOT NULL, "isCalculated" boolean NOT NULL, "grandTotal" numeric(12,2) NOT NULL, "totalLines" double precision NOT NULL, "totalLinesAccountingSchemeCurrency" double precision NOT NULL, "grandTotalAccountingSchemeCurrency" numeric(12,2) NOT NULL, "currencyMultiplyingRateToAccountingSchemeCurrency" double precision NOT NULL, "transactionDate" date NOT NULL, "printDate" TIMESTAMP, "printed" boolean NOT NULL DEFAULT false, "printError" character varying, "content" bytea, "paymentTermInDays" integer NOT NULL, "printLanguageIsoCode" character varying NOT NULL, "reverseCharge" boolean NOT NULL, "updtOpId" integer NOT NULL, "bankAccountId" integer, "currencyId" integer, "customerId" integer, "organizationId" integer, CONSTRAINT "PK_79dd7040b09cdfb78bf34b1a1ba" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."currency" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "isoCode" character varying NOT NULL, CONSTRAINT "PK_65d3b524ea256c4212b59c326ae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_215b85e32bfbe1cf9f1c47e14d" ON "public"."currency" ("displayName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."accounting_scheme" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "updtOpId" integer NOT NULL, "currencyId" integer, CONSTRAINT "PK_737f0a6e3f640fb693fcd0211d5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_7f415d9c097ba5ef53afe8c39f" ON "public"."accounting_scheme" ("displayName") `,
    );
    await queryRunner.query(
      `CREATE TABLE "public"."language" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "updtOpId" integer NOT NULL DEFAULT 0, "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "isoCode" character varying NOT NULL, CONSTRAINT "PK_b1678c612b1e8b66f3b45aacc66" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_language_isoCode" ON "public"."language" ("isoCode") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_language_displayName" ON "public"."language" ("displayName") `,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency_rate" ADD CONSTRAINT "FK_d3fbaf99fba4368c95511d5ac5e" FOREIGN KEY ("fromId") REFERENCES "public"."currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency_rate" ADD CONSTRAINT "FK_bf6acee0aed6631bffbea3a9b6d" FOREIGN KEY ("toId") REFERENCES "public"."currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."document_number_sequence" ADD CONSTRAINT "FK_f482d3de1ec19e51500a34def53" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD CONSTRAINT "FK_b27f376ebf341d1c03042b81f5e" FOREIGN KEY ("legalAddressId") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" ADD CONSTRAINT "FK_119e6dc00cb0db3abe3ef377c36" FOREIGN KEY ("countryId") REFERENCES "public"."country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_identity" ADD CONSTRAINT "FK_08b4f3034c5f421078fe2ee7f71" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_to_organization" ADD CONSTRAINT "FK_801f03e910ec33b71d5ce3821ec" FOREIGN KEY ("organizationId") REFERENCES "public"."organization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_to_organization" ADD CONSTRAINT "FK_de139b9d33d4412afdb78e15618" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "public"."bank_account" ADD CONSTRAINT "FK_b2e0013409c8c1f888cfa671cff" FOREIGN KEY ("bankId") REFERENCES "public"."bank"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ADD CONSTRAINT "FK_9368130af39c5fa0b0a7aeb9635" FOREIGN KEY ("invoiceId") REFERENCES "public"."sales_invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ADD CONSTRAINT "FK_46e2135df8a294a44f6da9cfb24" FOREIGN KEY ("lineTaxId") REFERENCES "public"."tax"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" ADD CONSTRAINT "FK_aa6a84182838c767209e1c4b5f2" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_vat" ADD CONSTRAINT "FK_024f69ee6accf1a6c7aa6efa688" FOREIGN KEY ("invoiceId") REFERENCES "public"."sales_invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice" ADD CONSTRAINT "FK_69b6ba86e29c318798bab324869" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "public"."accounting_scheme" ADD CONSTRAINT "FK_fe9538948c1f6d3cb94dce7b74d" FOREIGN KEY ("updtOpId") REFERENCES "public"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounting_scheme" ADD CONSTRAINT "FK_8c86374aef6ec7ad93a098cf59f" FOREIGN KEY ("currencyId") REFERENCES "public"."currency"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" ADD CONSTRAINT "FK_2c1aeb39925d1e1ace946ca2f21" FOREIGN KEY ("addressId") REFERENCES "public"."address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "public"."unit_of_measurement_conversion" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "currencyMultiplyingRate" double precision NOT NULL, "updtOpId" integer NOT NULL, "fromId" integer, "toId" integer, CONSTRAINT "PK_f8796ed806b216628b252bb3b4c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "public"."unit_of_measurement" ("id" SERIAL NOT NULL, "updtTs" TIMESTAMP NOT NULL DEFAULT now(), "isActive" boolean NOT NULL DEFAULT true, "isCurrent" boolean NOT NULL DEFAULT true, "displayName" character varying NOT NULL, "updtOpId" integer NOT NULL, CONSTRAINT "PK_f64cb86b321fc095bde6961d6da" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."accounting_scheme" DROP CONSTRAINT "FK_8c86374aef6ec7ad93a098cf59f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."accounting_scheme" DROP CONSTRAINT "FK_fe9538948c1f6d3cb94dce7b74d"`,
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
      `ALTER TABLE "public"."sales_invoice" DROP CONSTRAINT "FK_69b6ba86e29c318798bab324869"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_vat" DROP CONSTRAINT "FK_024f69ee6accf1a6c7aa6efa688"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" DROP CONSTRAINT "FK_aa6a84182838c767209e1c4b5f2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" DROP CONSTRAINT "FK_46e2135df8a294a44f6da9cfb24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."sales_invoice_line" DROP CONSTRAINT "FK_9368130af39c5fa0b0a7aeb9635"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."bank_account" DROP CONSTRAINT "FK_b2e0013409c8c1f888cfa671cff"`,
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
      `ALTER TABLE "public"."user_to_organization" DROP CONSTRAINT "FK_de139b9d33d4412afdb78e15618"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_to_organization" DROP CONSTRAINT "FK_801f03e910ec33b71d5ce3821ec"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."user_identity" DROP CONSTRAINT "FK_08b4f3034c5f421078fe2ee7f71"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."address" DROP CONSTRAINT "FK_119e6dc00cb0db3abe3ef377c36"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."customer" DROP CONSTRAINT "FK_b27f376ebf341d1c03042b81f5e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."document_number_sequence" DROP CONSTRAINT "FK_f482d3de1ec19e51500a34def53"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency_rate" DROP CONSTRAINT "FK_bf6acee0aed6631bffbea3a9b6d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."currency_rate" DROP CONSTRAINT "FK_d3fbaf99fba4368c95511d5ac5e"`,
    );
    await queryRunner.query(`DROP INDEX "public"."IDX_language_displayName"`);
    await queryRunner.query(`DROP INDEX "public"."IDX_language_isoCode"`);
    await queryRunner.query(`DROP TABLE "public"."language"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_7f415d9c097ba5ef53afe8c39f"`,
    );
    await queryRunner.query(`DROP TABLE "public"."accounting_scheme"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_215b85e32bfbe1cf9f1c47e14d"`,
    );
    await queryRunner.query(`DROP TABLE "public"."currency"`);
    await queryRunner.query(`DROP TABLE "public"."sales_invoice"`);
    await queryRunner.query(`DROP TABLE "public"."sales_invoice_vat"`);
    await queryRunner.query(`DROP TABLE "public"."sales_invoice_line"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_826d69dcc65d9650be67af6d48"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_34f6ca1cd897cc926bdcca1ca3"`,
    );
    await queryRunner.query(`DROP TABLE "public"."product"`);
    await queryRunner.query(`DROP TABLE "public"."tax"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d13847b5db0cf66c1ea23615eb"`,
    );
    await queryRunner.query(`DROP TABLE "public"."bank_account"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4177d3499a2c7edb42ead3d916"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_99ecb4de1fda7ee51fb91b3055"`,
    );
    await queryRunner.query(`DROP TABLE "public"."organization"`);
    await queryRunner.query(`DROP TABLE "public"."user_to_organization"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_065d4d8f3b5adb4a08841eae3c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_78a916df40e02a9deb1c4b75ed"`,
    );
    await queryRunner.query(`DROP TABLE "public"."user"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c555c4388d24da3c6fa22d85bd"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1c243d6d65f07e169d53a69ea0"`,
    );
    await queryRunner.query(`DROP TABLE "public"."user_identity"`);
    await queryRunner.query(`DROP TABLE "public"."address"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_df529c45726940beb548906481"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_71b54ec7502c83c7f503f57c64"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a843215c5e375894bcd5bdf24a"`,
    );
    await queryRunner.query(`DROP TABLE "public"."customer"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_06db3c87e9e1b9eba96918b308"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."UQ_6eba1a52ee121d100c8a0a6510c"`,
    );
    await queryRunner.query(`DROP TABLE "public"."country"`);
    await queryRunner.query(`DROP TABLE "public"."document_number_sequence"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_1930777e62854add6a64f50d42"`,
    );
    await queryRunner.query(`DROP TABLE "public"."bank"`);
    await queryRunner.query(`DROP TABLE "public"."currency_rate"`);
  }
}

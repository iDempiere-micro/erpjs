import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  getService,
  getTechnicalUser,
  SalesInvoiceService,
  SalesInvoiceServiceKey,
} from '../../model';

export class InvoicesContent1609846660789 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const technicalUser = await getTechnicalUser(entityManager);
    const salesInvoiceService: SalesInvoiceService = getService(
      SalesInvoiceServiceKey,
    );
    await salesInvoiceService.fixPrint(entityManager);
  }

  public async down(): Promise<void> { /* intentionally left blank */ }
}

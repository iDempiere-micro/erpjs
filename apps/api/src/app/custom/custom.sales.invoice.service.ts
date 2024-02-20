import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import { EntityManager } from 'typeorm';
import { SalesInvoiceSaveArgsModel, SalesInvoiceService } from '../../model';

@Injectable()
export class CustomSalesInvoiceService extends SalesInvoiceService {
  async checkSaveArgs(
    transactionalEntityManager: EntityManager,
    args: SalesInvoiceSaveArgsModel,
  ) {
    const organization = await this.getOrganization(
      transactionalEntityManager,
      args,
    );
    if (organization.displayName === 'DP') {
      const invoices = await this.getRepository(transactionalEntityManager)
        .createQueryBuilder('invoice')
        .where(
          `invoice.organization = :organizationId AND invoice."transactionDate">='2021-01-01' AND invoice."transactionDate"<='2021-12-31' `,
          {
            organizationId: organization.id,
          },
        )
        .getMany();
      const total = _.sum(
        invoices.map((x) => x.totalLinesAccountingSchemeCurrency),
      );

      if (total > 1000000) throw new Error('Cannot invoice more than 1M CZK');
    }
  }
}

import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { SalesInvoiceJobImplementation } from '../model/sales.invoice.job.implementation';

@Injectable()
export class MigrationService implements OnModuleInit {
    constructor(
        @InjectConnection() readonly connection: Connection,
    ) {
    }

    async onModuleInit() {
      console.log('Running migrations...');
        await this.connection.runMigrations({
            transaction: 'all',
        });

        // TODO: here?
      console.log('Starting jobs...');
      SalesInvoiceJobImplementation.plan();
    }
}

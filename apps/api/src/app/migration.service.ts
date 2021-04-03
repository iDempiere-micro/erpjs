import { Injectable, OnModuleInit } from '@nestjs/common';
import { Connection } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class MigrationService implements OnModuleInit {
  constructor(@InjectConnection() readonly connection: Connection) {}

  async onModuleInit(): Promise<void> {
    console.log('Running migrations...');
    await this.connection.runMigrations({
      transaction: 'all',
    });
  }
}

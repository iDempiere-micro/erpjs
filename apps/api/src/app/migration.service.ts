import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

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

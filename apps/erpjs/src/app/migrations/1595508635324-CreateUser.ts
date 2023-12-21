import { MigrationInterface, QueryRunner } from 'typeorm';
import { EverythingSubscriber } from '../support/everything.subscriber';

export class CreateUser1595508635324 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.manager;
    await EverythingSubscriber.createTechnicalUser(manager);
  }

  async down(): Promise<void> {
    /* intentionally empty */
  }
}

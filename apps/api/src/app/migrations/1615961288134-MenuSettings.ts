import { MigrationInterface, QueryRunner } from 'typeorm';
import { getTechnicalUser } from '../../model';
import { Menu } from '../../model/generated/entities/Menu';
import { createMenuItems } from './1612983991735-MenuContent';

export class MenuSettings1615961288134 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const technicalUser = await getTechnicalUser(entityManager);

    const menu = (await entityManager.getRepository(Menu).find())[0];

    const items = [{ to: 'settings', displayName: 'menu.items.Settings' }];

    await createMenuItems(menu, entityManager, items, technicalUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // left empty
  }
}

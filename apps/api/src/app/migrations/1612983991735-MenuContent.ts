import { MigrationInterface, QueryRunner } from 'typeorm';
import { getTechnicalUser, UserModel } from '../../model';
import { Menu } from '../../model/generated/entities/Menu';
import { MenuItem } from '../../model/generated/entities/MenuItem';
import { EntityManager } from 'typeorm';

export const createMenuItems = async (
  menu: Menu,
  entityManager: EntityManager,
  items: any,
  technicalUser: UserModel,
) => {
};

export class MenuContent1612983991735 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const technicalUser = await getTechnicalUser(entityManager);
    const menu = new Menu();
    menu.displayName = 'menu.ERPStandard';
    menu.updtOp = technicalUser;

    const items = [
      { to: '', displayName: 'menu.items.Dashboard' },
      { to: 'customers', displayName: 'menu.items.Customers' },
      { to: 'sales-invoices', displayName: 'menu.items.SalesInvoices' },
    ];

    await createMenuItems(menu, entityManager, items, technicalUser);
  }

  public async down(): Promise<void> {
    // left empty
  }
}

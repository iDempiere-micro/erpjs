import { EntityManager, MigrationInterface, QueryRunner } from 'typeorm';
import { getTechnicalUser, UserModel } from '../../model';
import { Menu } from '../../model/generated/entities/Menu';
import { MenuItem } from '../../model/generated/entities/MenuItem';

export const createMenuItems = async (
  menu: Menu,
  entityManager: EntityManager,
  items: any,
  technicalUser: UserModel,
) => {
  for (const item of items) {
    const menuItem = new MenuItem();
    menuItem.menu = menu;
    menuItem.to = item.to;
    menuItem.displayName = item.displayName;
    menuItem.updtOp = technicalUser;
    await entityManager.save(menuItem);
  }
};

export class MenuContent1612983991735 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const entityManager = queryRunner.manager;
    const technicalUser = await getTechnicalUser(entityManager);
    const menu = new Menu();
    menu.displayName = 'menu.ERPStandard';
    menu.updtOp = technicalUser;

    await entityManager.save(menu);

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

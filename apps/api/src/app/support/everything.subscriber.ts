import { User } from '../../model/generated/entities/User';
import { EntityManager } from 'typeorm';

export class EverythingSubscriber {
  static createTechnicalUser = async (manager: EntityManager) => {
    const user = new User();
    user.email = process.env.TECHNICAL_USER_EMAIL;
    await manager.save(user);
  };
}

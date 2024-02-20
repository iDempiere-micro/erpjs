import { EntityManager } from 'typeorm';
import { User } from '../../model/generated/entities/User';

export class EverythingSubscriber {
  static createTechnicalUser = async (manager: EntityManager) => {
    const user = new User();
    user.email = process.env.TECHNICAL_USER_EMAIL;
    await manager.save(user);
  };
}

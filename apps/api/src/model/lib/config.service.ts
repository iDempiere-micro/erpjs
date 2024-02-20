import { EntityManager, Repository } from 'typeorm';
import { Config } from '../generated/entities/Config';
import { BaseEntityService } from './base.entity.service';
import { ConfigData, ConfigModel } from './config.model';
import { ConfigSaveArgsModel } from './config.save.args.model';

export const ConfigServiceKey = 'ConfigService';

export class ConfigService<T extends ConfigData> extends BaseEntityService<
  ConfigModel<T>,
  ConfigSaveArgsModel<T>
> {
  createEntity(): ConfigModel<T> {
    return new Config();
  }

  protected getRepository(
    transactionalEntityManager,
  ): Repository<ConfigModel<T>> {
    return transactionalEntityManager.getRepository(Config);
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: ConfigSaveArgsModel<T>,
    config: ConfigModel<T>,
  ): Promise<ConfigModel<T>> {
    config.displayName = args.displayName;
    config.content = args.content;
    return config;
  }

  typeName(): string {
    return ConfigServiceKey;
  }
}

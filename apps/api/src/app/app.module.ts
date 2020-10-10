import { Inject, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { migrations } from './migrations';
import { MigrationService } from './migration.service';
import { serviceProviders } from './serviceProviders';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { resolvers } from './resolvers';
import { ModuleRef } from '@nestjs/core';
import { ModelModule, ModuleReferenceService } from '../model';
import { AuthModule } from '../auth';

// typeOrm + list of entities from THIS application + try to enhance e.g. Organization
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',

      host: process.env.NX_POSTGRES_HOST,
      database: process.env.NX_POSTGRES_DATABASE,
      port: +process.env.NX_POSTGRES_PORT,
      username: process.env.NX_POSTGRES_USER,
      password: process.env.NX_POSTGRES_PASSWORD,
      ssl: false,

      synchronize: true,
      logging: !(process.env.CI === "true"),
      migrationsRun: false, // we run migrations programmatically
      // also no subscribers! use Nest DI and push to connection.subscribers
      entities: entities,
      migrations: migrations,
      cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/entity/migration',
      },
    }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const aws = configService.get<string>('AWS') === 'true';
        return {
          installSubscriptionHandlers: true,
          autoSchemaFile: aws ? '/tmp/schema.gql' : 'schema.gql',
          debug: true,
          context: ({ req }) => ({ req }),
          sortSchema: true,
        };
      },
    }),
    ModelModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, MigrationService, ...serviceProviders, ...resolvers],
})
export class AppModule {
  constructor(private moduleRef: ModuleRef) {
    new ModuleReferenceService(moduleRef);
  }
}

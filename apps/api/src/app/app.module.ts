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

console.log('*** ENV', process.env)

// typeOrm + list of entities from THIS application + try to enhance e.g. Organization
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (
        process.env.DATABASE_URL ?
          {
            type: 'postgres',
            extra: {
              ssl: { rejectUnauthorized: false }
            },
            url: process.env.DATABASE_URL,
            synchronize: true,
            logging: true,
            migrationsRun: false, // we run migrations programmatically
            // also no subscribers! use Nest DI and push to connection.subscribers
            entities: entities,
            migrations: migrations
          }
        :
          {
            type: 'postgres',
            host: configService.get('POSTGRES_HOST', 'localhost'),
            port: configService.get<number>('POSTGRES_PORT', 5432),
            username: configService.get('POSTGRES_USER', 'postgres'),
            password: configService.get('POSTGRES_PASSWORD', 'postgres'),
            database: configService.get('POSTGRES_DATABASE', 'erp3'),

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

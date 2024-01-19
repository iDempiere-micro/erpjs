import { Module } from '@nestjs/common';

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
import { FileController } from './controllers/file.controller';
import { DateScalar } from './support/date.scalar';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

// typeOrm + list of entities from THIS application + try to enhance e.g. Organization
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        process.env.DATABASE_URL
          ? {
              type: 'postgres',
              extra: {
                ssl: { rejectUnauthorized: false },
              },
              url: process.env.DATABASE_URL,
              synchronize: false,
              logging: !(process.env.CI === 'true'),
              migrationsRun: false, // we run migrations programmatically
              // also no subscribers! use Nest DI and push to connection.subscribers
              entities: entities,
              migrations: migrations,
            }
          : {
              type: 'postgres',
              host: configService.get('POSTGRES_HOST', 'localhost'),
              port: configService.get<number>('POSTGRES_PORT', 5432),
              username: configService.get('POSTGRES_USER', 'postgres'),
              password: configService.get('POSTGRES_PASSWORD', 'postgres'),
              database: configService.get('POSTGRES_DATABASE', 'erp3'),

              ssl: false,

              synchronize: false,
              logging: !(process.env.CI === 'true'),
              migrationsRun: false, // we run migrations programmatically
              // also no subscribers! use Nest DI and push to connection.subscribers
              entities: entities,
              migrations: migrations,
              cli: {
                entitiesDir: 'src/entity',
                migrationsDir: 'src/entity/migration',
              },
            },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      subscriptions: {
        'graphql-ws': true
      },
      autoSchemaFile: 'schema.gql', // aws ? '/tmp/schema.gql' :
      context: ({ req }) => ({ req }),
      sortSchema: true,
      driver: ApolloDriver,
    }),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: +process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE === 'true',
        debug: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    ModelModule,
    AuthModule,
  ],
  controllers: [AppController, FileController],
  providers: [
    AppService,
    MigrationService,
    ...serviceProviders,
    ...resolvers,
    DateScalar,
  ],
})
export class AppModule {
  constructor(private moduleRef: ModuleRef) {
    new ModuleReferenceService(moduleRef);
  }
}

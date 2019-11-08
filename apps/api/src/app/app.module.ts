import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities, EntityModule, migrations, ModelModule } from '@erpjs/data';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '../auth/auth.module';
import { ApiModule } from '../api/api.module';
import { HandlebarsAdapter, MailerModule } from '@nest-modules/mailer';
import { NullPricingService } from './null.pricing.service';
import { dbHost, dbName, dbPassword, dbPort, dbSsl, dbUser } from '../environments/config';
import { TerminusModule } from '@nestjs/terminus';
import { TerminusOptionsService } from './terminus-options.service';

@Module({
  imports: [
    ModelModule,
    TypeOrmModule.forRoot(
        process.env.DATABASE_URL ?
        // heroku config see https://github.com/typeorm/typeorm/issues/571
          {
            type: 'postgres',
            extra: {
              ssl: true,
            },
            url: process.env.DATABASE_URL,
            synchronize: true,
            logging: true,
            migrationsRun: false, // we run migrations programmatically
            // also no subscribers! use Nest DI and push to connection.subscribers
            entities: entities,
            migrations: migrations,
          } :
        // development config
        {
          type: 'postgres',
          host : dbHost,
          database: dbName,
          port: dbPort,
          username: dbUser,
          password: dbPassword,
          ssl : dbSsl,
          synchronize: true,
          logging: true,
          migrationsRun: false, // we run migrations programmatically
          // also no subscribers! use Nest DI and push to connection.subscribers
          entities: entities,
          migrations: migrations,
          cli: {
            entitiesDir: 'src/entity',
            migrationsDir: 'src/entity/migration',
          },
        },
    ),
    EntityModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: process.env.AWS ? '/tmp/schema.gql' : 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    AuthModule,
    ApiModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.googlemail.com',
        port: 465,
        secure: true,
        debug: true,
        auth: {
          user: 'robot@naseukoly.cz',
          pass: 'secure_password',
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
    TerminusModule.forRootAsync({
      useClass: TerminusOptionsService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, NullPricingService]
})
export class AppModule {}

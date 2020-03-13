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

const CryptoTS = require('crypto-ts');

async function getDBConfiguration() {
  const dbConfigUrl = process.env.DB_CONFIG_URL;

  const getContent = function(url) {
    // return new pending promise
    return new Promise((resolve, reject) => {
      // select http or https module, depending on requested url
      const lib = url.startsWith('https') ? require('https') : require('http');
      const request = lib.get(url, (response) => {
        // handle http errors
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error('Failed to load page, status code: ' + response.statusCode));
        }
        // temporary data holder
        let data = '';
        // on every content chunk, push it to the data array
        response.on('data', (chunk) => data += chunk );
        // we are done, resolve promise with those joined chunks
        response.on('end', () => resolve(data));
      });
      // handle connection errors of the request
      request.on('error', (err) => reject(err))
    })
  };
  console.log('**** dbConfigUrl', dbConfigUrl);
  async function getDBUrl() {
    const data = await getContent(dbConfigUrl);
    console.log('**** data', data);
    const bytes = CryptoTS.AES.decrypt(JSON.parse(data as string).databaseUrl, process.env.SECRET);
    const result = bytes.toString(CryptoTS.enc.Utf8);
    console.log('**** result', result);
    return result;
  }

  const databaseUrl =
    dbConfigUrl ? await getDBUrl() : process.env.DATABASE_URL;
  console.log('**** databaseUrl', databaseUrl);

  return databaseUrl ?
    // heroku config see https://github.com/typeorm/typeorm/issues/571
    {
      type: 'postgres',
      extra: {
        ssl:  !databaseUrl.includes('@localhost:'),
      },
      url: databaseUrl ? databaseUrl : process.env.DATABASE_URL,
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
    }
}

@Module({
  imports: [
    ModelModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () => await getDBConfiguration() as any
    }
    ),
    EntityModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: process.env.AWS ? '/tmp/schema.gql' : 'schema.gql',
      debug: true,
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

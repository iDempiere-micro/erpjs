import { Module } from '@nestjs/common';

import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationService } from './authentication.service';
import { GqlAuthGuard } from './gql.auth.guard';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [GqlAuthGuard, AuthenticationService],
  exports: [GqlAuthGuard, AuthenticationService],
})
export class AuthModule {}

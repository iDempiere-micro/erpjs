import { Module } from '@nestjs/common';

import { GqlAuthGuard } from './gql.auth.guard';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationService } from './authentication.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [GqlAuthGuard, AuthenticationService],
  exports: [GqlAuthGuard, AuthenticationService],
})
export class AuthModule {}

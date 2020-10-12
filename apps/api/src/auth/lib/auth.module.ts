import { HttpModule, Module } from '@nestjs/common';

import { GqlAuthGuard } from './gql.auth.guard';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationService } from './authentication.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [GqlAuthGuard, AuthenticationService],
  exports: [GqlAuthGuard, AuthenticationService],
})
export class AuthModule {}

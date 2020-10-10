import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { GqlAuthGuard } from './gql.auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [JwtStrategy, GqlAuthGuard],
  exports: [JwtStrategy, GqlAuthGuard],
})
export class AuthModule {}

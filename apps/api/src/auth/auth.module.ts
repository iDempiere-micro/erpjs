import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { GqlAuthGuard } from './gql.auth.guard';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, GqlAuthGuard],
  exports: [JwtStrategy, GqlAuthGuard]
})
export class AuthModule {}

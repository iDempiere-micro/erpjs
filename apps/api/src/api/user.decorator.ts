import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ManagementClient } from 'auth0';
import { runJob, UserServiceImplementation } from '@erpjs/data';
import { getManager } from 'typeorm';
import { auth0ClientId, auth0ClientSecret, auth0Domain } from '../environments/config';
import { GqlExecutionContext } from '@nestjs/graphql';

const authZero = new ManagementClient({
  // 3
  domain: auth0Domain,
  clientId: auth0ClientId,
  clientSecret: auth0ClientSecret,
  scope: 'read:users update:users'
});

async function setUser(user) {
  const profile = await authZero.getUser({ id: (user as any).sub });
  const userServiceImplementation = new UserServiceImplementation();
  return await runJob( getManager(), async () => await userServiceImplementation.handleLogin(profile) );
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request) {
      const context = GqlExecutionContext.create(ctx);
      const user = context.getContext().req.user;
      return setUser(user);
    }
    return setUser(request.user);
  },
);

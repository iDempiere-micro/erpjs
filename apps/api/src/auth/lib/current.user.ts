import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
// import { ManagementClient } from 'auth0';
import { getManager } from 'typeorm';
import { getService, UserService, UserServiceKey } from '../../model';

let authZero = null;

async function setUser(user) {
  if (!authZero) {
    /* authZero = new ManagementClient({
      // 3
      domain: process.env.NX_AUTH0_DOMAIN,
      clientId: process.env.NX_SERVER_CLIENTID,
      clientSecret: process.env.NX_SERVER_CLIENT_SECRET,
      scope: 'read:users update:users',
    }); */
  }

  const profile = null; // await authZero.getUser({ id: (user as any).sub });
  const userService = getService<UserService>(UserServiceKey);
  return await userService.handleLogin(getManager(), profile);
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if (!request) {
      const context = GqlExecutionContext.create(ctx);
      return setUser(context.getContext().req.user);
    }
    return setUser(request.user);
  }
);

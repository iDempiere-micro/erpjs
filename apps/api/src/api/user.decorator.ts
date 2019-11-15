import { createParamDecorator } from '@nestjs/common';
import { ManagementClient } from 'auth0';
import { runJob, UserServiceImplementation } from '@erpjs/data';
import { getManager } from 'typeorm';
import { auth0ClientId, auth0ClientSecret, auth0Domain } from '../environments/config';

const authZero = new ManagementClient({
  // 3
  domain: auth0Domain,
  clientId: auth0ClientId,
  clientSecret: auth0ClientSecret,
  scope: 'read:users update:users'
});

export const User = createParamDecorator(async (data, [root, args, ctx, info]) => {
  const user = ctx.req.user;
  const profile = await authZero.getUser({ id: (user as any).sub });
  const userServiceImplementation = new UserServiceImplementation();
  return await runJob( getManager(), async () => await userServiceImplementation.handleLogin(profile) );
} );

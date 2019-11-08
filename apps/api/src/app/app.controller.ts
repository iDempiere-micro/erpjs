import { ManagementClient, User } from 'auth0';
import * as express from 'express';

import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AppService } from './app.service';
import { Message } from '@erpjs/api-interfaces';
import { auth0ClientId, auth0ClientSecret, auth0Domain } from '../environments/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  async getHello(): Promise<Message> {
    return await this.appService.getData(); // 1
  }

  @Get('secret')
  @UseGuards(AuthGuard('jwt')) // 2
  secretEndpoint(@Request() req: express.Request): string {
    return 'this endpoint should be protected';
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt')) // 2
  async profile(@Request() req: express.Request): Promise<any> {
    const authZero = new ManagementClient({
      // 3
      domain: auth0Domain,
      clientId: auth0ClientId,
      clientSecret: auth0ClientSecret,
      scope: 'read:users update:users'
    });

    return await authZero
      .getUser({ id: ((req as any).user as any).sub }) // 4
      .then((user: User) => {
        return user;
      })
      .catch(err => {
        return err;
      });
  }
}

import { HttpService, Injectable } from '@nestjs/common';
import {
  getService,
  getTechnicalUser,
  UserModel,
  UserService,
  UserServiceKey,
} from '../../model';
import { getManager } from 'typeorm';

interface KeycloakUserInfoResponse {
  sub: string;
  email_verified: boolean;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

export class AuthenticationError extends Error {}

@Injectable()
export class AuthenticationService {
  private readonly baseURL: string;
  private readonly realm: string;

  constructor(private httpService: HttpService) {
    this.baseURL = process.env.KEYCLOAK_BASE_URL;
    this.realm = process.env.KEYCLOAK_REALM;
  }

  /**
   * Call the OpenId Connect UserInfo endpoint on Keycloak: https://openid.net/specs/openid-connect-core-1_0.html#UserInfo
   *
   * If it succeeds, the token is valid and we get the user infos in the response
   * If it fails, the token is invalid or expired
   */
  async authenticate(accessToken: string): Promise<UserModel> {
    const manager = getManager();
    const technicalUser = await getTechnicalUser(manager);
    if (accessToken === process.env.FAKE_TOKEN) {
      return technicalUser;
    }

    const url = `${this.baseURL}/realms/${this.realm}/protocol/openid-connect/userinfo`;

    try {
      const response = await this.httpService
        .get<KeycloakUserInfoResponse>(url, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        })
        .toPromise();

      const userService = getService<UserService>(UserServiceKey);
      const profile = {
        user_id: response.data.email,
        name: response.data.preferred_username,
        identities: [
          {
            user_id: response.data.email,
            provider: 'keycloak',
          },
        ],
      };

      return await userService.handleLogin(manager, profile);
    } catch (e) {
      console.log('*** auth failed', accessToken, e);
      throw new AuthenticationError(e.message);
    }
  }
}

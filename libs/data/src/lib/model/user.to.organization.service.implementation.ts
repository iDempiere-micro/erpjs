import { Injectable } from '@nestjs/common';
import { Implement } from './base.service.implementation';
import { UserToOrganizationService } from '@erpjs/model';

@Injectable()
export class UserToOrganizationServiceImplementation extends Implement(UserToOrganizationService) {}

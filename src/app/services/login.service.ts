import { Injectable } from '@angular/core';

import * as firebase from "firebase/app";

import { BaseAuthService } from "../base-services/auth.service";
import { UnauthenticatedUser, AuthenticatedUser } from '../models';

@Injectable()
export class LoginService {

  constructor(private backendAuthService: BaseAuthService) {
  }

  public attemptLogin(user: UnauthenticatedUser): Promise<firebase.UserInfo> {
    return this.backendAuthService.attemptLogin(user.email, user.password);
  }

  public logout(): Promise<void> {
    return this.backendAuthService.logout();
  }
}

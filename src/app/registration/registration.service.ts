import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";
import {debounceTime, distinctUntilChanged } from "rxjs/operators";

import { BaseAuthService } from '../base-services/auth.service';
import { AuthenticatedUser } from '../models';

@Injectable()
export class RegistrationService {

  constructor(private authService: BaseAuthService) { }

  public signupUser(user: AuthenticatedUser): Promise<void> {
    const pass = user.password;
    delete user.password;
    return this.authService.signup(user.email, pass, user);
  }

  public userExists(email: string): Observable<boolean> {
    return this.authService.userExists(email);
  }

}

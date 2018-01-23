import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { UnauthenticatedUser, AuthenticatedUser } from '../models';


import { Observable } from 'rxjs/Observable';
import { DybBaseService } from './dyb-base.service';

@Injectable()
export class LoginService extends DybBaseService {

  private readonly LOGIN_API_BASE = "/api/login";

  constructor(private http: HttpClient) { 
    super();
  }

  public attemptLogin(user: UnauthenticatedUser): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser|null>(this.LOGIN_API_BASE, user);
  }
}

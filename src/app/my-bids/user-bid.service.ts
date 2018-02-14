import { Injectable } from '@angular/core';

import { Observable } from "rxjs";

import { UserService } from "../firebase-services/user.service";
import { AuthService } from "../firebase-services/auth.service";
import { Item } from '../models';

@Injectable()
export class UserBidService {

  constructor( private auth: AuthService, private user: UserService) { }

  // Todo: Error handling for auth.

  public getUsersItems(): Observable<Item> {
    return Observable.fromPromise(this.auth.uniqueID()).mergeMap(
      (uid) => {
        return this.user.following(uid);
      }
    );
  }
}

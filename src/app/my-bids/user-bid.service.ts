import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { mergeMap } from "rxjs/operator/mergeMap";

import { Item } from '../models';
import { BaseUserService } from '../base-services/user.service';
import { BaseAuthService } from '../base-services/auth.service';

@Injectable()
export class UserBidService {

  constructor( private auth: BaseAuthService, private user: BaseUserService) { }

  // Todo: Error handling for auth.

  public getUsersItems(): Observable<Item> {
    return Observable.fromPromise(this.auth.uniqueID()).mergeMap(
      (uid) => {
        return this.user.following(uid);
      }
    );
  }
}

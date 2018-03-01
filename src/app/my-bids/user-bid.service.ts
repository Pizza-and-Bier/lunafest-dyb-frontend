import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { fromPromise } from "rxjs/observable/fromPromise";
import { mergeMap } from "rxjs/operators";

import { Item, User } from '../models';
import { BaseUserService, BaseAuthService, BaseItemService } from '../base-services';

@Injectable()
export class UserBidService {

  constructor( private auth: BaseAuthService, private user: BaseUserService, private itemService: BaseItemService) { }

  // Todo: Error handling for auth.

  public getCurrentUserId(): Promise<string> {
    return this.auth.uniqueID();
  }

  public unfollowItem(itemId: string): Promise<any> {
    return this.getCurrentUserId().then(
      (id) => {
        return this.user.unfollow(id, itemId);
      }
    );
  }

  public getUserBids(): Observable<Item[]> {
    return this.getCurrentUser().pipe(
      mergeMap(
        (user) => {
          return this.getItems().map(
            (items) => {
              if (user.following === undefined) {
                return [];
              }
              return items.filter(item => user.following.indexOf(item.key) > -1);
            }
          );
        }
      )
    );
  }

  public getItems(): Observable<Item[]> {
    return this.itemService.all().snapshotChanges().map(
      (changes) => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }
    );
  }

  public getCurrentUser(): Observable<User> {
    return Observable.fromPromise(this.getCurrentUserId()).pipe(
      mergeMap(
        (id) => {
          return this.user.user(id);
        }
      )
    );
  }
}

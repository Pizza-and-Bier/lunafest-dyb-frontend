import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { mergeMap } from "rxjs/operators";
import { AngularFireList } from "angularfire2/database";

import { Item, User } from "../models";
import { BaseItemService, BaseUserService, BaseAuthService } from "../base-services";

@Injectable()
export class ItemListService {

  constructor(private backendItemsService: BaseItemService, private userService: BaseUserService, private authService: BaseAuthService) { }

  public initConnection(): Observable<Item[]> {
    return this.backendItemsService.all().snapshotChanges().map(
      (changes) => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }
    );
  }

  public getUser(): Observable<User> {
    return Observable.fromPromise(this.authService.uniqueID()).pipe(
      mergeMap(
        (id) => {
          return this.userService.user(id);
        }
      )
    );
  }

}

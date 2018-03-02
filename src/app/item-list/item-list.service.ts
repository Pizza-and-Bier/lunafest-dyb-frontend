import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { mergeMap } from "rxjs/operators";
import { AngularFireList } from "angularfire2/database";

import { Item, User, Auction } from "../models";
import { BaseItemService, BaseUserService, BaseAuthService } from "../base-services";
import { BaseAuctionService } from '../base-services/auction.service';

@Injectable()
export class ItemListService {

  constructor(private backendItemsService: BaseItemService, private userService: BaseUserService, private authService: BaseAuthService, private auctionService: BaseAuctionService) { }

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


  public getAuction(): Observable<Auction> {
    return this.auctionService.getAuction().snapshotChanges().map(
      (changes) => {
        return changes.payload.val();
      }
    );
  }
}

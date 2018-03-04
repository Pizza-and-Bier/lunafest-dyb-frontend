import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { BaseUserService } from '../base-services/user.service';
import { BaseAuthService } from '../base-services/auth.service';
import { BaseItemService } from '../base-services';
import { Item } from '../models';

@Injectable()
export class PlaceABidService {

  constructor(private userService: BaseUserService, private authService: BaseAuthService, private itemService: BaseItemService) { }

  public placeBid(itemId: string, bidAmount: number): Promise<any> {
    return this.authService.uniqueID().then(
      (uid) => {
        return this.userService.bid(uid, itemId, bidAmount);
      }
    );
  }

  public getItem(itemId: string): Observable<Item> {
    return this.itemService.oneWithSubscribe(itemId).snapshotChanges().map(
      (changes) => {
        return {key: changes.payload.key, ...changes.payload.val()};
      }
    );
  }

  public followItem(itemId: string): Promise<any> {
    return this.authService.uniqueID().then(
      (uid) => {
        return this.userService.follow(uid, itemId);
      }
    );
  }

}

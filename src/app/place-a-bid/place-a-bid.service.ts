import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { BaseUserService } from '../base-services/user.service';
import { BaseAuthService } from '../base-services/auth.service';

@Injectable()
export class PlaceABidService {

  constructor(private userService: BaseUserService, private authService: BaseAuthService) { }

  public placeBid(itemId: string, bidAmount: number): Promise<any> {
    return this.authService.uniqueID().then(
      (uid) => {
        return this.userService.bid(uid, itemId, bidAmount);
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

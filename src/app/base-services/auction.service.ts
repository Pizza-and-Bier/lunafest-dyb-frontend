import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from "angularfire2/database";
import { Observable, Subscription } from "rxjs";

import { Auction } from "../models";
import { Unsubscribe } from "./unsubscribe";

@Injectable()
@Unsubscribe
export class BaseAuctionService implements OnDestroy {

  private subs: Subscription[] = [];

  constructor(private db: AngularFireDatabase) { }

  public getAuction(): AngularFireObject<Auction> {
    return this.db.object<Auction>("auction");
  }

  public updateStatus(status: string): Promise<any> {
    return this.db.object("auction/status").set(status);
  }

  ngOnDestroy() {}

}

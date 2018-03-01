import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable"

import { BaseAuctionService } from '../base-services/auction.service';
import { Auction } from '../models';

@Injectable()
export class AuctionAdminService {

  constructor(private auctionService: BaseAuctionService) { }

  public getAuction(): Observable<Auction> {
    return this.auctionService.getAuction().valueChanges();
  }

  public updateStatus(status: string): Promise<any> {
    return this.auctionService.updateStatus(status);
  }
}

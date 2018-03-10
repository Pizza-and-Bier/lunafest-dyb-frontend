import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable"

import { BaseAuctionService } from '../base-services/auction.service';
import { Auction } from '../models';
import { BaseWinnerService } from '../base-services';

@Injectable()
export class AuctionAdminService {

  constructor(private auctionService: BaseAuctionService, private winnersService: BaseWinnerService) { }

  public getAuction(): Observable<Auction> {
    return this.auctionService.getAuction().valueChanges();
  }

  public updateStatus(status: string): Promise<any> {
    return this.auctionService.updateStatus(status);
  }

  public generatePaymentRecords(): Promise<any> {
    return this.winnersService.createPaymentRecords();
  }
}

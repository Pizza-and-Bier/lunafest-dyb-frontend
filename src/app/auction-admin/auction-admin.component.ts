import { Component, OnInit } from '@angular/core';

import { AuctionAdminService } from './auction-admin.service';
import { AuctionStatus } from '../models/auction-status.enum';
import { Auction } from '../models';

@Component({
  selector: 'dyb-auction-admin',
  templateUrl: './auction-admin.component.html',
  styleUrls: ['./auction-admin.component.scss']
})
export class AuctionAdminComponent implements OnInit {

  public currentAuction: Auction;

  constructor(private auctionAdminService: AuctionAdminService) { }

  ngOnInit() {
    this.getAuction();
  }

  public startAuction(): void {
    this.auctionAdminService.updateStatus(AuctionStatus.STARTED);
  }

  public shouldShowButton(button: string): boolean {
    switch (button) {
      case "pause":
        return this.currentAuction.status === AuctionStatus.STARTED;
        break;
      case "play":
        return (this.currentAuction.status === AuctionStatus.PAUSED || this.currentAuction.status === AuctionStatus.STOPPED);
        break;
      case "stop":
        return (this.currentAuction.status === AuctionStatus.PAUSED || this.currentAuction.status === AuctionStatus.STARTED);
        break;
      default:
        return true;
        break;
    }
  }

  public pauseAuction(): void {
    this.auctionAdminService.updateStatus(AuctionStatus.PAUSED);
  }

  public stopAuction(): void {
    this.auctionAdminService.updateStatus(AuctionStatus.STOPPED);
  }

  private getAuction(): void {
    this.auctionAdminService.getAuction().subscribe(
      (auction) => {
        console.log(auction);
        this.currentAuction = auction;
      }
    )
  }

}

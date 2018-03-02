import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { BaseAuctionService } from '../base-services/auction.service';
import { AuctionStatus } from '../models/auction-status.enum';
import { Unsubscribe } from '../base-services/unsubscribe';



@Component({
  selector: 'dyb-auction-closed',
  templateUrl: './auction-closed.component.html',
  styleUrls: ['./auction-closed.component.scss']
})
export class AuctionClosedComponent implements OnInit, OnDestroy {

  public status: AuctionStatus;

  private subs: Subscription[] = [];

  constructor(private auctionService: BaseAuctionService, private router: Router) { }

  ngOnInit() {
    this.getAuctionStatus();
  }

  public getAuctionStatus(): void {
    this.subs.push(this.auctionService.getAuction().valueChanges().subscribe(
      (auction) => {
        this.status = <AuctionStatus>auction.status;
        if (this.status !== AuctionStatus.PAUSED && this.status !== AuctionStatus.STOPPED) {
          this.router.navigate(["/login"]);
        }
      }
    ));
  }

  ngOnDestroy() {}

}

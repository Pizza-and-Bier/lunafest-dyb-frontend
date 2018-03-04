import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";

import { UserBidService } from "./user-bid.service";
import { Item, User } from '../models';
import { MyBidsItem } from './my-bids-item';
import { SerializationHelper } from '../util/serialization-helper';
import { PlaceABidComponent } from '../place-a-bid/place-a-bid.component';
import { AuctionStatus } from '../models/auction-status.enum';

@Component({
  selector: 'dyb-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.scss']
})
export class MyBidsComponent implements OnInit {

  public userBids: Observable<Item[]>;

  public currentUser: User;

  public noBids = false;

  public displayedImages: number[] = [];

  constructor(private userBidService: UserBidService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.getUserBids();
  }

  public userWinningItem(item: Item): boolean {
    if (item.currentBid) {
      return item.currentBid.createdBy === this.currentUser.uid;
    }
    else {
      return false;
    }
  }

  public unfollowItem(item): void {
    this.userBidService.unfollowItem(item.key).then(
      (data) => {
        console.log(data);
      }
    )
  }

  public placeBid(item: Item): void {
    let dialogRef = this.dialog.open(PlaceABidComponent, {
      data: {
        id: item.key,
        user: this.currentUser
      }
    });

    dialogRef.afterClosed().subscribe(
      (data) => {
        console.log("I did it!");
      }
    );
  }

  private getUserBids(): void {
    this.userBidService.getCurrentUser().subscribe(
      (user) => {
        console.log(user);
        this.currentUser = user;
      }
    );

    this.userBids = this.userBidService.getUserBids();

    this.userBids.subscribe(
      (data) => {
        console.log(data);
        if (data === null) {
          this.noBids = true;
        }
        else {
          this.noBids = false;
        }
        data.map((elem) => {
          for (let i = 0; i < elem.images.length; i++) {
            if (elem.images[i] !== undefined && elem.images[i] !== null) {
              this.displayedImages.push(i);
              break;
            }
          }
        });
      }
    );

  }

  private checkAuction(): void {
    this.userBidService.getAuction().subscribe(
      (data) => {
        if (data.status !== AuctionStatus.STARTED && data.status !== AuctionStatus.ENTERING_DATA) {
          this.router.navigate(["/auction-closed"]);
        }
      }
    );
  }

}

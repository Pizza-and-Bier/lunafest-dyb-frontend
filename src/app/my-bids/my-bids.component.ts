import { Component, OnInit } from '@angular/core';

import { UserBidService } from "./user-bid.service";
import { Item } from '../models';
import { MyBidsItem } from './my-bids-item';
import { SerializationHelper } from '../util/serialization-helper';

@Component({
  selector: 'dyb-my-bids',
  templateUrl: './my-bids.component.html',
  styleUrls: ['./my-bids.component.css']
})
export class MyBidsComponent implements OnInit {

  public userBids: MyBidsItem[] = [];

  public currentUser: number = 1;

  constructor(private userBidService: UserBidService) { }

  ngOnInit() {
    this.getUserBids();
  }

  private getUserBids(): void {
    this.userBidService.getUsersItems().subscribe(
      (data) => {
        console.log(data);
        this.userBids.push(SerializationHelper.toInstance(new MyBidsItem(), data));
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from "rxjs/Observable";

import { Item } from "../models";
import { ItemListService } from "./item-list.service";
<<<<<<< HEAD
import { AuthService } from '../firebase-services/auth.service';
import { UserService } from '../firebase-services/user.service';
import { ItemListItem } from './item-list-item';
import { SerializationHelper } from "../util";
import { PlaceABidComponent } from '../place-a-bid/place-a-bid.component';
=======
import { BaseAuthService } from '../base-services/auth.service';
import { BaseUserService } from '../base-services/user.service';
>>>>>>> master

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {

  // Todo: can ItemListService be provided here when I'm not mocking the backend??

  public itemList: Observable<Item[]>;

  public itemInfoToggles: boolean[] = [];

  constructor(private itemListService: ItemListService, public dialog: MatDialog) { }

  ngOnInit() {
    this.initItems();
  }

  public toggleDescription(index: number): void {
    this.itemInfoToggles[index] = !this.itemInfoToggles[index];
  }

  public placeBid(item: Item): void {
    let dialogRef = this.dialog.open(PlaceABidComponent, {
      width: "300px",
      height: "400px",
      data: item
    });
  }

  private initItems(): void {
    console.log('getitems');
    this.itemList = this.itemListService.initConnection();
    this.itemList.subscribe(
      (data) => {
        console.log("subscriiiibbee");
        this.itemInfoToggles.length = data.length;
        this.itemInfoToggles.fill(false);
        console.log(this.itemInfoToggles);
      }
    );
    // this.itemListService.getItems().subscribe(
    //   (data) => {
    //     data.map((elem) => {
    //       this.itemList.push(SerializationHelper.toInstance(new ItemListItem(), elem));
    //     });
    //     console.log(data);
    //     console.log(this.itemList);
    //   }
    // )
  }
}

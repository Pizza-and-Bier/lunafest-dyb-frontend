import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Observable } from "rxjs/Observable";

import { Item } from "../models";
import { ItemListService } from "./item-list.service";
import { ItemListItem } from './item-list-item';
import { SerializationHelper } from "../util";
import { PlaceABidComponent } from '../place-a-bid/place-a-bid.component';

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
      data: {
        item: item
      }
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

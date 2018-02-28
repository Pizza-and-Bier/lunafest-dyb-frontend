import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialogRef, MatDialog, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from "rxjs/Observable";

import { Item } from "../models";
import { ItemListService } from "./item-list.service";
import { ItemListItem } from './item-list-item';
import { SerializationHelper } from "../util";
import { PlaceABidComponent } from '../place-a-bid/place-a-bid.component';
import { ItemListFilterDialogComponent } from '../item-list-filter-dialog/item-list-filter-dialog.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {

  // Todo: can ItemListService be provided here when I'm not mocking the backend??

  public itemList: Observable<Item[]>;

  public itemInfoToggles: boolean[] = [];

  public filterCategories: string[];

  constructor(private itemListService: ItemListService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.initItems();
  }

  public uploadFile(event) {
    console.log(event);
  }

  public toggleDescription(index: number): void {
    this.itemInfoToggles[index] = !this.itemInfoToggles[index];
  }

  public placeBid(item: Item): void {
    let dialogRef = this.dialog.open(PlaceABidComponent, {
      width: "320px",
      height: "400px",
      data: {
        item: item
      }
    });
  }

  public openFilterDialog(): void {
    const dialogRef = this.dialog.open(ItemListFilterDialogComponent);

    dialogRef.afterClosed().subscribe(
      (result: string[]|null) => {
        // this.filterCategories = result;
        console.log(result);
      }
    );
  }

  public editItem(item: Item): void {
    this.router.navigate(["/user/admin/edit", item.key]);
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
  }

}

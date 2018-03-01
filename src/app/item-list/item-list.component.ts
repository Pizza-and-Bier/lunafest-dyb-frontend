import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialogRef, MatDialog, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from "rxjs/Observable";

import { Item, User } from "../models";
import { ItemListService } from "./item-list.service";
import { ItemListItem } from './item-list-item';
import { SerializationHelper } from "../util";
import { PlaceABidComponent } from '../place-a-bid/place-a-bid.component';
import { ItemListFilterDialogComponent } from '../item-list-filter-dialog/item-list-filter-dialog.component';
import { CategoriesPipe } from '../util/pipes/categories.pipe';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {

  public itemList: Observable<Item[]>;

  public itemInfoToggles: boolean[] = [];

  public filterCategories: string[]|null = null;

  public filteredListingLength: number = null;

  private currentUser: User;

  constructor(private itemListService: ItemListService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.initItems();
    this.initUser();
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
        item: item,
        id: item.key,
        user: this.currentUser
      }
    });
  }

  public openFilterDialog(): void {
    const dialogRef = this.dialog.open(ItemListFilterDialogComponent, {
      data: this.filterCategories
    });

    dialogRef.afterClosed().subscribe(
      (result: string[]|null) => {
        if (result === null) {
          return;
        }
        if (result.length <= 0) {
          this.clearFilters();
        }
        else {
          this.itemList.subscribe((data) => {
            this.filterCategories = result;
            const pipe = new CategoriesPipe();
            this.filteredListingLength = pipe.transform(data, this.filterCategories).length;
          });
        }
      }
    );
  }

  public clearFilters(): void {
    this.filteredListingLength = null;
    this.filterCategories = null;
  }

  public editItem(item: Item): void {
    this.router.navigate(["/user/admin/edit", item.key]);
  }

  private initItems(): void {
    console.log('getitems');
    this.itemList = this.itemListService.initConnection();
    this.itemList.subscribe(
      (data) => {
        this.itemInfoToggles.length = data.length;
        this.itemInfoToggles.fill(false);
      }
    );
  }

  private initUser(): void {
    this.itemListService.getUser().subscribe(
      (data) => {
        this.currentUser = data;
      }
    );
  }

}

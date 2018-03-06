import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialogRef, MatDialog, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";

import { Item, User } from "../models";
import { ItemListService } from "./item-list.service";
import { ItemListItem } from './item-list-item';
import { SerializationHelper } from "../util";
import { PlaceABidComponent } from '../place-a-bid/place-a-bid.component';
import { ItemListFilterDialogComponent } from '../item-list-filter-dialog/item-list-filter-dialog.component';
import { CategoriesPipe } from '../util/pipes/categories.pipe';
import { AuctionStatus } from '../models/auction-status.enum';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {

  public itemList: Observable<Item[]>;

  public itemInfoToggles: boolean[] = [];
  
  public itemImageSelections: number[] = [];

  public filterCategories: string[]|null = null;

  public filteredListingLength: number = null;

  public mobile = false;


  private currentUser: User;

  constructor(
    private itemListService: ItemListService,
    public dialog: MatDialog,
    private router: Router,
    public breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([
      Breakpoints.Web,
    ]).subscribe((result) => {
      if (result.matches) {
        this.mobile = false;
      }

    });
    breakpointObserver.observe([
      Breakpoints.TabletPortrait,
      Breakpoints.Handset
    ]).subscribe(result => {
      if (result.matches) {
        this.mobile = true;
      }
    })
    breakpointObserver.observe([
      Breakpoints.TabletLandscape
    ]).subscribe(result => {
      if (result.matches) {
        this.mobile = true;
      }
    });

   }

  ngOnInit() {
    this.initItems();
    this.initUser();
    this.checkAuction();
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
          this.itemList.take(1).subscribe((data) => {
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

  public changeImageSource(newImage: number, itemIndex: number): void {
    this.itemImageSelections[itemIndex] = newImage;
  }

  private initItems(): void {
    console.log('getitems');
    this.itemList = this.itemListService.initConnection();
    this.itemList.subscribe(
      (data) => {
        this.itemInfoToggles.length = data.length;
        this.itemInfoToggles.fill(false);
        this.itemImageSelections.length = data.length;
        data.forEach((elem, index) => {
          for (let i = 0; i < elem.images.length; i++) {

            if (elem.images[i] !== undefined && elem.images[i] !== null) {
              this.itemImageSelections[index] = i;
              break;
            }
          }
        });
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

  private checkAuction(): void {
    this.itemListService.getAuction().subscribe(
      (data) => {
        if (data.status !== AuctionStatus.STARTED && data.status !== AuctionStatus.ENTERING_DATA) {
          this.router.navigate(["/auction-closed"]);
        }
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Item } from "../models";
import { ItemListService } from "./item-list.service";
import { BaseAuthService } from '../base-services/auth.service';
import { BaseUserService } from '../base-services/user.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {

  //Todo: can ItemListService be provided here when I'm not mocking the backend??

  public itemList: Observable<Item[]>;

  public itemInfoToggles: boolean[] = [];

  constructor(private itemListService: ItemListService, private auth: BaseAuthService, private user: BaseUserService) { }

  ngOnInit() {
    this.initItems();
  }

  public toggleDescription(index: number): void {
    this.itemInfoToggles[index] = !this.itemInfoToggles[index]; 
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

    this.auth.uniqueID().then((uid) => {
      this.user.following(uid).subscribe((items) => {
          console.log(items);
      });
  });
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

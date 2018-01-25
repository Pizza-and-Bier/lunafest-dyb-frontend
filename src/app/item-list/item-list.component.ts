import { Component, OnInit } from '@angular/core';

import { Item } from "../models";
import { ItemListService } from "./item-list.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  //Todo: can ItemListService be provided here when I'm not mocking the backend??

  public itemList: Item[] = [];

  constructor(private itemListService: ItemListService) { }

  ngOnInit() {
    this.getItems();
  }

  private getItems(): void {
    console.log('getitems');
    this.itemListService.getItems().subscribe(
      (data) => {
        this.itemList = data
        console.log(data);
        console.log(this.itemList);
      }
    )
  }

}

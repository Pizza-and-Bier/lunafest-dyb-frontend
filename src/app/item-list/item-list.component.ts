import { Component, OnInit } from '@angular/core';

import { Item } from "../models";
import { ItemListService } from "./item-list.service";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
  providers: [
    ItemListService
  ]
})
export class ItemListComponent implements OnInit {

  public itemList: Item[] = [];

  constructor(private itemListService: ItemListService) { }

  ngOnInit() {
    this.getItems();
  }

  private getItems(): void {
    this.itemListService.getItems().subscribe(
      (data) => {
        this.itemList = data.slice();
      }
    )
  }

}

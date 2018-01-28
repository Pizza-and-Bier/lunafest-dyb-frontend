import { Component, OnInit } from '@angular/core';

import { Item } from "../models";
import { ItemListService } from "./item-list.service";
import { ItemListItem } from './item-list-item';
import { SerializationHelper } from "../util";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  //Todo: can ItemListService be provided here when I'm not mocking the backend??

  public itemList: ItemListItem[] = [];

  constructor(private itemListService: ItemListService) { }

  ngOnInit() {
    this.getItems();
  }

  public toggleDescription(index: number): void {
    this.itemList[index].showDescription = !this.itemList[index].showDescription; 
  }

  private getItems(): void {
    console.log('getitems');
    this.itemListService.getItems().subscribe(
      (data) => {
        data.map((elem) => {
          this.itemList.push(SerializationHelper.toInstance(new ItemListItem(), elem));
        });
        console.log(data);
        console.log(this.itemList);
      }
    )
  }

}

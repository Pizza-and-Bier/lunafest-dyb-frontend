import { Component, OnInit } from '@angular/core';

import { Observable } from "rxjs";

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

  public itemList: Observable<Item[]>;

  constructor(private itemListService: ItemListService) { }

  ngOnInit() {
    this.initItems();
  }

  public toggleDescription(index: number): void {
    this.itemList[index].showDescription = !this.itemList[index].showDescription; 
  }

  private initItems(): void {
    console.log('getitems');
    this.itemList = this.itemListService.initConnection();
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

import { Injectable } from '@angular/core';

import { ItemService } from "../services";
import { Item } from "../models";

import { Observable } from "rxjs/Observable";

@Injectable()
export class ItemListService {

  constructor(private itemService: ItemService) { }

  public getItems(): Observable<Item[]> {
    console.log("item-list service");
    return this.itemService.getItems();
  }

}

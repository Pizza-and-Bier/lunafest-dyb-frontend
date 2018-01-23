import { Injectable } from '@angular/core';

import { ItemService } from "../services";
import { Item } from "../models";

@Injectable()
export class ItemListService {

  constructor(private itemService: ItemService) { }

  public getItems(): Observable<Item[]> {
    return this.itemService.getItems();
  }

}

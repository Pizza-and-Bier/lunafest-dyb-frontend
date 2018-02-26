import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { BaseItemService } from '../base-services';
import { Item } from "../models";

@Injectable()
export class EditItemService {

  constructor(private itemService: BaseItemService) { }

  public getItem(itemId: string): Observable<Item> {
    return this.itemService.one(itemId);
  }

  public updateItem(itemId: string, item: Item): Promise<Item> {
    return this.itemService.update(itemId, item);
  }
}

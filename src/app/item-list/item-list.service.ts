import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Item } from "../models";
import { BaseItemService } from "../base-services/item.service";

@Injectable()
export class ItemListService {

  constructor(private backendItemsService: BaseItemService) { }

  public initConnection(): Observable<Item[]> {
    return this.backendItemsService.all();
  }

}

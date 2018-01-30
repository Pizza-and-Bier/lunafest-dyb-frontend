import { Injectable } from '@angular/core';

import { ItemService } from "../services";
import { Item } from "../models";

import { BackendItemsService } from "../firebase-services/backend-items.service";

import { Observable } from "rxjs/Observable";

@Injectable()
export class ItemListService {

  constructor(private backendItemsService: BackendItemsService) { }

  public initConnection(): Observable<Item[]> {
    console.log("item-list service");
    return this.backendItemsService.initConnection();
  }

}

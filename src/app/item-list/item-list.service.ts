import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { Item } from "../models";
import { BackendItemsService } from "../firebase-services/item-list.service";

@Injectable()
export class ItemListService {

  constructor(private backendItemsService: BackendItemsService) { }

  public initConnection(): Observable<Item[]> {
    return this.backendItemsService.all();
  }

}

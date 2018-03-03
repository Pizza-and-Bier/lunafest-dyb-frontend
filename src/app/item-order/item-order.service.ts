import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { BaseItemService } from '../base-services';
import { Item } from '../models';

@Injectable()
export class ItemOrderService {

  constructor(private itemService: BaseItemService) { }

  public getItems(): Observable<Item[]> {
    return this.itemService.all().snapshotChanges().take(1).map(
      (changes) => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }
    );
  }

  public updateItem(item: Item): Promise<any> {
    return this.itemService.update(item.key, item);
  }
}

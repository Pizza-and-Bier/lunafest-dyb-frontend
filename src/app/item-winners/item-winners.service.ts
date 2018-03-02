import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { BaseItemService, BaseUserService } from '../base-services';
import { Item, User } from '../models';

@Injectable()
export class ItemWinnersService {

  constructor(private itemService: BaseItemService, private userService: BaseUserService) { }

  public getItems(): Observable<Item[]> {
    return this.itemService.all().snapshotChanges().map(
      (changes) => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }
    );
  }

  public getAllUsers(): Observable<User[]> {
    return this.userService.allUsers().valueChanges();
  }

  public markItemPaid(item: Item): Promise<any> {
    return this.itemService.update(item.key, item);
  }
}

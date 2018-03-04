import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { BaseWinnerService } from '../base-services';
import { Item, User } from '../models';
import { ItemWinner } from '../models/item-winner.model';

@Injectable()
export class ItemWinnersService {

  constructor(private winnerService: BaseWinnerService) { }

  public getItems(): Observable<Item[]> {
    return this.winnerService.getWinners().snapshotChanges().take(1).map(
      (changes) => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }
    );
  }
}

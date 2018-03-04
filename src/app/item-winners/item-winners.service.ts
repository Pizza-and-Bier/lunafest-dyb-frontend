import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { BaseWinnerService } from '../base-services';
import { Item, User } from '../models';
import { ItemWinner } from '../models/item-winner.model';
import { PaymentRecord } from '../models/payment-record';

@Injectable()
export class ItemWinnersService {

  constructor(private winnerService: BaseWinnerService) { }

  public getItems(): Observable<ItemWinner[]> {
    return this.winnerService.getWinners().snapshotChanges().take(1).map(
      (changes) => {
        return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
      }
    );
  }

  public getPaymentRecords(): Observable<PaymentRecord[]> {
    return this.winnerService.getPaymentRecords().snapshotChanges().map(
      (changes) => {
        return changes.map(c => ({uid: c.payload.key, ...c.payload.val()}));
      }
    );
  }

  public markAsPaid(uid: string): Promise<any> {
    return this.winnerService.markAsPaid(uid);
  }
}

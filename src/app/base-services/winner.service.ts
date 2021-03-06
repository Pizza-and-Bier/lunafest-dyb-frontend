import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Observer, Subscription } from "rxjs";
import { AngularFireDatabase, AngularFireList, AngularFireObject } from "angularfire2/database"
import { ItemWinner } from "../models/item-winner.model";
import { PaymentRecord } from "../models/payment-record";

@Injectable()
export class BaseWinnerService {

  constructor(private db: AngularFireDatabase) { }

  public getWinners(): AngularFireList<ItemWinner> {
    return this.db.list<ItemWinner>("/winners");
  }

  public getPaymentRecords(): AngularFireList<PaymentRecord> {
    return this.db.list<PaymentRecord>("/payments");
  }

  public togglePayment(userId: string, paid: boolean): Promise<any> {
    return this.db.object<PaymentRecord>(`/payments/${userId}`).update({paid: paid});
  }

  public createPaymentRecords(): Promise<any> {
    return new Promise(
      (resolve, reject) => {
        this.db.list<ItemWinner>("/winners").snapshotChanges().map(
          (changes) => {
            return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
          }
        )
        .subscribe(
          (data: ItemWinner[]) => {
            data.map((elem) => {
              this.db.list<PaymentRecord>("/payments").set(elem.uid, {paid: false}).catch(err => reject(err));
            });
            resolve("Created");
          }
        )
      }
    )
  }
}

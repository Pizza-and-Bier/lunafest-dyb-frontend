import { Component, OnInit } from '@angular/core';

import { ItemWinnersService } from './item-winners.service';
import { PaymentRecord } from '../models/payment-record';
import { WinnerGrouping } from './winner-grouping';

@Component({
  selector: 'dyb-item-winners',
  templateUrl: './item-winners.component.html',
  styleUrls: ['./item-winners.component.scss']
})
export class ItemWinnersComponent implements OnInit {

  public winnersList: {} = {};

  public winnerKeys: string[] = [];

  public payments: {[uid: string]: PaymentRecord} = {};

  public loading = true;

  constructor(private itemWinnersService: ItemWinnersService) { }

  ngOnInit() {
    this.getAndOrganizeItems();
    this.getPayments();
  }

  public markAsPaid(winner: WinnerGrouping): void {
    this.itemWinnersService.markAsPaid(winner.uid).then(
      (_) => {
        console.log(`winner group ${winner.winner} marked as paid`);
      }
    )

  }

  private getPayments(): void {
    this.itemWinnersService.getPaymentRecords().subscribe(
      (data) => {
        data.map((elem) => {
          this.payments[elem.uid] = elem;
        });
      }
    )
  }

  private getAndOrganizeItems(): void {
    this.itemWinnersService.getItems().subscribe(
      (data) => {
        data.forEach((elem) => {
          if (this.winnersList[elem.uid] !== undefined) {
            console.log(this.winnersList[elem.uid]);
            this.winnersList[elem.uid].items.push({name: elem.itemName, amount: elem.amount});
          }
          else {
            this.winnersList[elem.uid] = {
              uid: elem.uid,
              winner: elem.winner,
              items: [{
                name: elem.itemName,
                amount: elem.amount
              }],
              paid: false
            };
          }
        });
        this.loading = false;
        this.winnerKeys = Object.keys(this.winnersList);
        console.log(this.winnersList);
        console.log(this.winnerKeys);
      }
    );
  }

}

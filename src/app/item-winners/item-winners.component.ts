import { Component, OnInit } from '@angular/core';

import { ItemWinnersService } from './item-winners.service';
import { WinnerGroup } from './winner-group.model';

@Component({
  selector: 'dyb-item-winners',
  templateUrl: './item-winners.component.html',
  styleUrls: ['./item-winners.component.scss']
})
export class ItemWinnersComponent implements OnInit {

  public winnersList: {} = {};

  public winnerKeys: string[] = [];

  constructor(private itemWinnersService: ItemWinnersService) { }

  ngOnInit() {
    this.getAndOrganizeItems();
  }

  public markAsPaid(winner: WinnerGroup): void {
    winner.items.map((elem) => {
      
    });

  }

  private getAndOrganizeItems(): void {
    this.itemWinnersService.getItems().subscribe(
      (data) => {
        data.forEach((elem) => {
          if (this.winnersList[elem.uid] !== undefined) {
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
        this.winnerKeys = Object.keys(this.winnersList);
        console.log(this.winnersList);
        console.log(this.winnerKeys);
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';

import { ItemWinnersService } from './item-winners.service';
import { WinnerGroup } from './winner-group.model';

@Component({
  selector: 'dyb-item-winners',
  templateUrl: './item-winners.component.html',
  styleUrls: ['./item-winners.component.scss']
})
export class ItemWinnersComponent implements OnInit {

  public winnersList: WinnerGroup[] = [];

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
      (items) => {
        items.map(
          (elem) => {
            const filteredList = this.winnersList.filter(w => w.winner.id === elem.currentBid.createdBy);
            if (filteredList.length > 0) {
              const existing = filteredList[0];
              this.winnersList[this.winnersList.indexOf(existing)].items.push(elem);
            }
            else {
              this.winnersList.push({
                winner: {
                  id: elem.currentBid.createdBy,
                  name: "",
                  paid: false
                },
                items: [
                  elem
                ]
              });
            }
          }
        );
        this.itemWinnersService.getAllUsers().subscribe(
          (users) => {
            users.map(
              (user) => {
                const filteredList = this.winnersList.filter(w => w.winner.id === user.uid);
                if (filteredList.length > 0) {
                  const existing = filteredList[0];
                  this.winnersList[this.winnersList.indexOf(existing)].winner.name = `${user.firstName} ${user.lastName}`;
                }
              }
            );
          }
        );
      }
    );
  }

}

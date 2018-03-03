import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";

import { ItemOrderService } from './item-order.service';
import { Item } from "../models";

@Component({
  selector: 'dyb-item-order',
  templateUrl: './item-order.component.html',
  styleUrls: ['./item-order.component.scss']
})
export class ItemOrderComponent implements OnInit {

  public items: Item[] = [];

  constructor(private itemOrderService: ItemOrderService) { }

  ngOnInit() {
    this.getItems();
  }

  private getItems(): void {
    this.itemOrderService.getItems().subscribe(
      (items) => {
        this.items = items;
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { Observable } from "rxjs/Observable";

import { ItemOrderService } from './item-order.service';
import { Item } from "../models";
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'dyb-item-order',
  templateUrl: './item-order.component.html',
  styleUrls: ['./item-order.component.scss']
})
export class ItemOrderComponent implements OnInit {

  public items: Item[] = [];

  constructor(private itemOrderService: ItemOrderService, private dragulaService: DragulaService, private router: Router) { }

  ngOnInit() {
    this.getItems();
    this.dragulaService.dropModel.subscribe(
      (data) => {
        const [bagName, e, el] = data;
        // Dragula doesn't give a good way to get the item or the index so we have to be creative.
        const dropped = this.items.filter(item => item.key === e.attributes['item-id'].value).pop();
        const index = this.items.indexOf(dropped);
        dropped.order = index;
        if (!dropped.ordered) {
          dropped.ordered = true;
        }
        this.itemOrderService.updateItem(dropped);
      }
    );
  }

  public editItem(item: Item): void {
    this.router.navigate(["/user/admin/edit", item.key]);
  }

  public done(): void {
    this.router.navigate(["/user/items/list"]);
  }

  private getItems(): void {
    this.itemOrderService.getItems().subscribe(
      (items) => {
        this.items = items;
      }
    );
  }

}

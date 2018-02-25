import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Item } from "../models";

@Component({
  selector: 'dyb-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  public existingItem: Item;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      (params) => {
        if (params["id"] !== undefined) {
          this.getItem(params["id"]);
        }
      }
    );
  }

  private getItem(itemId: string): void {

  }

}

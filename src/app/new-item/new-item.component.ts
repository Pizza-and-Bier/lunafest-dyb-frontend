import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';

import { NewItemService } from "./new-item.service";
import { NewItemFormOutput } from '../new-item-form/new-item-form-output.model';
import { SerializationHelper } from '../util';
import { Item } from "../models";
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'dyb-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  public savingItem = false;

  public itemSaveComplete = false;

  constructor(private newItemService: NewItemService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  public save(formData: NewItemFormOutput): void {
    const newItem = SerializationHelper.toInstance(new Item(), formData);
    newItem.bidders = [];
    this.savingItem = true;
    this.newItemService.addNew(newItem).then(
      (data) => {
        console.log("done adding");
        this.itemSaveComplete = true;
        setTimeout(() => {
          this.router.navigate(["/user/items/list"]);
        }, 1500);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public cancel(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Cancel Add",
        content: "Are you sure you want to cancel adding this item? Any data you've entered will be lost.",
        acceptText: "Leave",
        cancelText: "Continue Adding"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(["/user/items/list"]);
      }
    });
  }
}

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
  styleUrls: ['./new-item.component.css']
})
export class NewItemComponent implements OnInit {

  public savingItem = false;

  public itemSaveComplete = false;

  constructor(private newItemService: NewItemService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  public save(formData: NewItemFormOutput): void {
    const categories = this.extractCategories(formData.categories);
    delete formData.categories;
    const newItem = SerializationHelper.toInstance(new Item(), formData);
    newItem.categories = categories;
    this.savingItem = true;
    this.newItemService.addNew(newItem).then(
      (data) => {
        setTimeout(() => {
          this.itemSaveComplete = true;
        }, 2000);
      }
    );
  }

  public cancel(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "New Item Cancel",
        content: "Are you sure you want to cancel adding this item? Any data you've entered will be lost."
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(["/user/items/list"]);
      }
    });
  }

  private extractCategories(categories: any): string[] {
    const chosen = [];
    for (const key in categories) {
      if (categories[key]) {
        chosen.push(key);
      }
    }
    return chosen;
  }

}

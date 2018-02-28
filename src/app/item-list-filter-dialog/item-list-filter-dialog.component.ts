import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList, MatDialogRef } from "@angular/material";

import { dybCategories } from "../models/categories.const";

@Component({
  selector: 'dyb-item-list-filter-dialog',
  templateUrl: './item-list-filter-dialog.component.html',
  styleUrls: ['./item-list-filter-dialog.component.css']
})
export class ItemListFilterDialogComponent implements OnInit {

  @ViewChild(MatSelectionList) selectionList: MatSelectionList;

  public categories = dybCategories.map(elem => elem.label);

  constructor(public dialogRef: MatDialogRef<ItemListFilterDialogComponent>) { }

  ngOnInit() {
  }

  public apply(): void {
    this.dialogRef.close(this.selectionList.selectedOptions.selected.map(elem => elem.value));
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

}

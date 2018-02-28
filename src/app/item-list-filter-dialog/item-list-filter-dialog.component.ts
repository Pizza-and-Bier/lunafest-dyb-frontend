import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatSelectionList, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { dybCategories } from "../models/categories.const";

@Component({
  selector: 'dyb-item-list-filter-dialog',
  templateUrl: './item-list-filter-dialog.component.html',
  styleUrls: ['./item-list-filter-dialog.component.scss']
})
export class ItemListFilterDialogComponent implements OnInit {

  @ViewChild(MatSelectionList) selectionList: MatSelectionList;

  public categories = dybCategories;

  public selectedMap: {[key: string]: boolean} = null;

  private selectionBase: {[key: string]: boolean} = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)public data: string[] | null,
    public dialogRef: MatDialogRef<ItemListFilterDialogComponent>
  ) { }

  ngOnInit() {
    dybCategories.map(elem => this.selectionBase[elem.controlName] = false);
    this.selectedMap = this.selectionBase;
    if (this.data !== undefined && this.data !== null) {
      this.data.map(e => this.selectedMap[e] = true);
    }
  }

  public apply(): void {
    const chosenCategories = [];
    this.selectionList.selectedOptions.selected.map((elem) => {
      chosenCategories.push(elem.value);
    });
    this.dialogRef.close(chosenCategories);
  }

  public cancel(): void {
    // Don't give anything back, we shouldn't change any state if they cancel.
    this.dialogRef.close(null);
  }

}

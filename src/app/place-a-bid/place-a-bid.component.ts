import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import { Item } from '../models';

@Component({
  selector: 'dyb-place-a-bid',
  templateUrl: './place-a-bid.component.html',
  styleUrls: ['./place-a-bid.component.css']
})
export class PlaceABidComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Item, public dialogRef: MatDialogRef<PlaceABidComponent>) { }

  ngOnInit() {
    console.log(this.data);
  }

}
